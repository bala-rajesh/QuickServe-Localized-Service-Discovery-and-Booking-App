package group_b.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import group_b.backend.model.User;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class OtpService {

    @Autowired
    private EmailService emailService;

    private static final SecureRandom random = new SecureRandom();

    /**
     * Generate a random 6-digit OTP
     */
    public String generateOtp() {
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    /**
     * Send verification email with OTP
     */
    public void sendVerificationEmail(User user, String otp) {
        String subject = "Email Verification - QuickServe";
        String body = "Hello " + user.getFullName() + ",\n\n" +
                "Thank you for signing up with QuickServe!\n\n" +
                "Your email verification code is: " + otp + "\n\n" +
                "This code will expire in 10 minutes.\n" +
                "If you did not request this, please ignore this email.\n\n" +
                "Best regards,\n" +
                "QuickServe Team";

        emailService.sendEmail(user.getEmail(), subject, body);
    }

    /**
     * Check if OTP is expired
     */
    public boolean isOtpExpired(LocalDateTime otpExpires) {
        return otpExpires != null && otpExpires.isBefore(LocalDateTime.now());
    }
}
