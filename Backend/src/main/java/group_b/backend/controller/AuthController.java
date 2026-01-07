package group_b.backend.controller;

import group_b.backend.dto.CustomerSignupDto;
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

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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

    @Autowired
    group_b.backend.service.OtpService otpService;

    @PostMapping("/provider/signup")
    public ResponseEntity<?> registerProvider(@RequestBody ProviderSignupDto signupDto) {
        if (userRepository.findByEmail(signupDto.getEmail()).isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error: Email is already in use!");
            return ResponseEntity.badRequest().body(response);
        }

        User user = new User();
        user.setFullName(signupDto.getFullName());
        user.setEmail(signupDto.getEmail());
        user.setPhone(signupDto.getPhone());
        user.setAddress(signupDto.getAddress());
        user.setPincode(signupDto.getPincode());
        user.setPassword(encoder.encode(signupDto.getPassword()));
        user.setRole(UserRole.PROVIDER);

        // Generate OTP and set expiry
        String otp = otpService.generateOtp();
        user.setEmailVerificationOtp(otp);
        user.setOtpExpires(java.time.LocalDateTime.now().plusMinutes(10));
        user.setEmailVerified(false);

        userRepository.save(user);

        ServiceProvider provider = new ServiceProvider();
        provider.setUser(user);
        provider.setBusinessName(signupDto.getBusinessName());
        provider.setCategory(signupDto.getCategory());
        provider.setBioShort(signupDto.getBioShort());
        provider.setAbout(signupDto.getAbout());
        serviceProviderRepository.save(provider);

        // Send OTP email
        otpService.sendVerificationEmail(user, otp);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Provider registered successfully! Please check your email for verification code.");
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/customer/signup")
    public ResponseEntity<?> registerCustomer(@RequestBody CustomerSignupDto signupDto) {
        if (userRepository.findByEmail(signupDto.getEmail()).isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error: Email is already in use!");
            return ResponseEntity.badRequest().body(response);
        }

        User user = new User();
        user.setFullName(signupDto.getFullName());
        user.setEmail(signupDto.getEmail());
        user.setPhone(signupDto.getPhone());
        user.setAddress(signupDto.getAddress());
        user.setPincode(signupDto.getPincode());
        user.setPassword(encoder.encode(signupDto.getPassword()));
        user.setRole(UserRole.CUSTOMER);

        // Generate OTP and set expiry
        String otp = otpService.generateOtp();
        user.setEmailVerificationOtp(otp);
        user.setOtpExpires(java.time.LocalDateTime.now().plusMinutes(10));
        user.setEmailVerified(false);

        userRepository.save(user);

        // Send OTP email
        otpService.sendVerificationEmail(user, otp);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Customer registered successfully! Please check your email for verification code.");
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
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

        if (authentication != null && authentication.isAuthenticated()
                && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "User not found with email: " + userDetails.getUsername()));

            Long specificId = user.getId();
            if (user.getRole() == UserRole.PROVIDER) {
                ServiceProvider sp = serviceProviderRepository.findByUser(user)
                        .orElseThrow(() -> new RuntimeException("Error: Provider profile not found."));
                specificId = sp.getId();
            }

            Map<String, Object> response = new HashMap<>();
            response.put("id", specificId);
            response.put("role", user.getRole().name());
            response.put("fullName", user.getFullName());
            response.put("email", user.getEmail());

            if (user.getRole() == UserRole.PROVIDER) {
                response.put("redirectUrl", "/service-provider/dashboard");
            } else {
                response.put("redirectUrl", "/customer/dashboard");
            }

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("User not authenticated");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }

    private ResponseEntity<?> authenticateUserInternal(LoginRequest loginRequest) {
        // Check if user exists
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isEmpty()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid email or password");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        User user = userOpt.get();

        // Check if email is verified
        if (!Boolean.TRUE.equals(user.getEmailVerified())) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Please verify your email before logging in");
            errorResponse.put("email", user.getEmail());
            errorResponse.put("needsVerification", "true");
            return ResponseEntity.status(403).body(errorResponse);
        }

        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateTokenFromUsername(userDetails.getUsername());
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        Long specificId = user.getId();
        if (user.getRole() == UserRole.PROVIDER) {
            ServiceProvider sp = serviceProviderRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Error: Provider profile not found."));
            specificId = sp.getId();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", jwt);
        response.put("id", specificId);
        response.put("role", user.getRole().name());
        response.put("fullName", user.getFullName());
        response.put("email", user.getEmail());

        if (user.getRole() == UserRole.PROVIDER) {
            response.put("redirectUrl", "/service-provider/dashboard");
        } else {
            response.put("redirectUrl", "/customer/dashboard");
        }

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).body(response);
    }

    @Autowired
    group_b.backend.service.EmailService emailService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody group_b.backend.dto.PasswordResetDto.ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        String token = java.util.UUID.randomUUID().toString();
        user.setResetPasswordToken(token);
        user.setResetPasswordExpires(java.time.LocalDateTime.now().plusHours(1));
        userRepository.save(user);

        // Assuming frontend runs on localhost:5173
        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        String emailContent = "Hello,\n\n" +
                "You have requested to reset your password.\n" +
                "Please click the link below to proceed:\n" +
                resetLink + "\n\n" +
                "This link will expire in 1 hour.\n" +
                "If you did not request this, please ignore this email.\n\n" +
                "Best regards,\n" +
                "QuickServe Team";

        emailService.sendEmail(user.getEmail(), "Password Reset Request", emailContent);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Password reset link sent to your email!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody group_b.backend.dto.PasswordResetDto.ResetPasswordRequest request) {
        User user = userRepository.findByResetPasswordToken(request.getToken())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or expired reset token!"));

        if (user.getResetPasswordExpires().isBefore(java.time.LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token has expired!");
        }

        user.setPassword(encoder.encode(request.getNewPassword()));
        user.setResetPasswordToken(null);
        user.setResetPasswordExpires(null);
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Password successfully reset!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody group_b.backend.dto.VerifyOtpRequest request) {
        Optional<User> userOpt = userRepository.findByEmailAndEmailVerificationOtp(request.getEmail(),
                request.getOtp());

        if (userOpt.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid OTP or email");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userOpt.get();

        // Check if OTP is expired
        if (otpService.isOtpExpired(user.getOtpExpires())) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "OTP has expired. Please request a new one.");
            return ResponseEntity.badRequest().body(response);
        }

        // Mark email as verified and clear OTP
        user.setEmailVerified(true);
        user.setEmailVerificationOtp(null);
        user.setOtpExpires(null);
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Email verified successfully! You can now log in.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody group_b.backend.dto.ResendOtpRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User not found");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userOpt.get();

        // Check if already verified
        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email is already verified");
            return ResponseEntity.badRequest().body(response);
        }

        // Generate new OTP
        String otp = otpService.generateOtp();
        user.setEmailVerificationOtp(otp);
        user.setOtpExpires(java.time.LocalDateTime.now().plusMinutes(10));
        userRepository.save(user);

        // Send OTP email
        otpService.sendVerificationEmail(user, otp);

        Map<String, String> response = new HashMap<>();
        response.put("message", "New verification code sent to your email");
        return ResponseEntity.ok(response);
    }
}
