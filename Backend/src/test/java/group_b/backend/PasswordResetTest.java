package group_b.backend;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import group_b.backend.controller.AuthController;
import group_b.backend.dto.PasswordResetDto;
import group_b.backend.model.User;
import group_b.backend.repository.UserRepository;
import group_b.backend.service.EmailService;

public class PasswordResetTest {

    @InjectMocks
    AuthController authController;

    @Mock
    UserRepository userRepository;

    @Mock
    EmailService emailService;

    @Mock
    PasswordEncoder encoder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testForgotPassword() {
        User user = new User();
        user.setEmail("test@example.com");

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        PasswordResetDto.ForgotPasswordRequest request = new PasswordResetDto.ForgotPasswordRequest();
        request.setEmail("test@example.com");

        ResponseEntity<?> response = authController.forgotPassword(request);

        Assertions.assertEquals(200, response.getStatusCode().value());
        verify(userRepository, times(1)).save(user);
        verify(emailService, times(1)).sendEmail(anyString(), anyString(), anyString());
        Assertions.assertNotNull(user.getResetPasswordToken());
    }

    @Test
    void testResetPassword() {
        User user = new User();
        user.setResetPasswordToken("valid-token");
        user.setResetPasswordExpires(LocalDateTime.now().plusHours(1));

        when(userRepository.findByResetPasswordToken("valid-token")).thenReturn(Optional.of(user));
        when(encoder.encode(anyString())).thenReturn("encoded-password");

        PasswordResetDto.ResetPasswordRequest request = new PasswordResetDto.ResetPasswordRequest();
        request.setToken("valid-token");
        request.setNewPassword("new-password");

        ResponseEntity<?> response = authController.resetPassword(request);

        Assertions.assertEquals(200, response.getStatusCode().value());
        verify(userRepository, times(1)).save(user);
        Assertions.assertNull(user.getResetPasswordToken());
    }
}
