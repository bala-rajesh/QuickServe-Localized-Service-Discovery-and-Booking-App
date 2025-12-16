package com.quickserve.backend.controller;

import com.quickserve.backend.model.User;
import com.quickserve.backend.payload.JwtResponse;
import com.quickserve.backend.payload.LoginRequest;
import com.quickserve.backend.repository.UserRepository;
import com.quickserve.backend.security.JwtUtils;
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
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/provider/signup")
    public ResponseEntity<?> registerProvider(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("PROVIDER");
        userRepository.save(user);

        return ResponseEntity.ok("Provider registered successfully!");
    }

    @PostMapping("/seeker/signup")
    public ResponseEntity<?> registerSeeker(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("SEEKER");
        userRepository.save(user);

        return ResponseEntity.ok("Seeker registered successfully!");
    }

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/provider/login")
    public ResponseEntity<?> authenticateProvider(@RequestBody LoginRequest loginRequest) {
        logger.info("Authenticate Provider request received for email: {}", loginRequest.getEmail());
        return authenticateUser(loginRequest, "PROVIDER");
    }

    @PostMapping("/seeker/login")
    public ResponseEntity<?> authenticateSeeker(@RequestBody LoginRequest loginRequest) {
        logger.info("Authenticate Seeker request received for email: {}", loginRequest.getEmail());
        return authenticateUser(loginRequest, "SEEKER");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("You've been signed out!");
    }

    private ResponseEntity<?> authenticateUser(LoginRequest loginRequest, String requiredRole) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        // Verify role
        String userRole = userDetails.getAuthorities().stream().findFirst().get().getAuthority().replace("ROLE_", "");
        if (!userRole.equals(requiredRole)) {
            return ResponseEntity.badRequest().body("Error: Incorrect role for this login portal.");
        }

        User user = userRepository.findByEmail(userDetails.getUsername());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new JwtResponse(null,
                        user.getId(),
                        user.getEmail(),
                        user.getRole()));
    }
}
