package group_b.backend.controller;

import group_b.backend.dto.CustomerSignupDto;
import group_b.backend.dto.JwtResponse;
import group_b.backend.dto.LoginRequest;
import group_b.backend.dto.ProviderSignupDto;
import group_b.backend.exception.ResourceNotFoundException;
import group_b.backend.model.ServiceProvider;
import group_b.backend.model.User;
import group_b.backend.model.UserRole;
import group_b.backend.repository.ServiceProviderRepository;
import group_b.backend.repository.UserRepository;
import group_b.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ServiceProviderRepository serviceProviderRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/provider/signup")
    public ResponseEntity<?> registerProvider(@RequestBody ProviderSignupDto signupDto) {
        if (userRepository.findByEmail(signupDto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User();
        user.setFullName(signupDto.getFullName());
        user.setEmail(signupDto.getEmail());
        user.setPhone(signupDto.getPhone());
        user.setAddress(signupDto.getAddress());
        user.setPincode(signupDto.getPincode());
        user.setPassword(encoder.encode(signupDto.getPassword()));
        user.setRole(UserRole.PROVIDER);
        userRepository.save(user);

        ServiceProvider provider = new ServiceProvider();
        provider.setUser(user);
        provider.setBusinessName(signupDto.getBusinessName());
        provider.setCategory(signupDto.getCategory());
        provider.setBioShort(signupDto.getBioShort());
        provider.setAbout(signupDto.getAbout());
        serviceProviderRepository.save(provider);

        return ResponseEntity.ok("Provider registered successfully!");
    }

    @PostMapping("/customer/signup")
    public ResponseEntity<?> registerCustomer(@RequestBody CustomerSignupDto signupDto) {
        if (userRepository.findByEmail(signupDto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User();
        user.setFullName(signupDto.getFullName());
        user.setEmail(signupDto.getEmail());
        user.setPhone(signupDto.getPhone());
        user.setAddress(signupDto.getAddress());
        user.setPincode(signupDto.getPincode());
        user.setPassword(encoder.encode(signupDto.getPassword()));
        user.setRole(UserRole.CUSTOMER);
        userRepository.save(user);

        return ResponseEntity.ok("Customer registered successfully!");
    }

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        logger.info("Login attempt for email: {}", loginRequest.getEmail());
        return authenticateUserInternal(loginRequest);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userDetails.getUsername()));

            Long specificId = user.getId();
            if (user.getRole() == UserRole.PROVIDER) {
                ServiceProvider sp = serviceProviderRepository.findByUser(user)
                        .orElseThrow(() -> new RuntimeException("Error: Provider profile not found."));
                specificId = sp.getId();
            }

            return ResponseEntity.ok(new JwtResponse(specificId, user.getRole().name()));
        }
        return ResponseEntity.status(401).body("User not authenticated");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }

    private ResponseEntity<?> authenticateUserInternal(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userDetails.getUsername()));
        
        Long specificId = user.getId();
        if (user.getRole() == UserRole.PROVIDER) {
            ServiceProvider sp = serviceProviderRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Error: Provider profile not found."));
            specificId = sp.getId();
        }

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new JwtResponse(
                        specificId,
                        user.getRole().name()));
    }
}
