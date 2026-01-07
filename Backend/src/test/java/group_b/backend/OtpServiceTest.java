package group_b.backend;

import group_b.backend.service.OtpService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import group_b.backend.service.EmailService;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = BackendApplication.class)
public class OtpServiceTest {

    @Autowired
    private OtpService otpService;

    @MockitoBean
    private EmailService emailService;

    @Test
    public void testGenerateOtp() {
        String otp = otpService.generateOtp();
        assertNotNull(otp);
        assertEquals(6, otp.length());
        assertTrue(otp.matches("\\d+"), "OTP should contain only digits");
    }

    @Test
    public void testIsOtpExpired() {
        // Test future time (not expired)
        LocalDateTime future = LocalDateTime.now().plusMinutes(5);
        assertFalse(otpService.isOtpExpired(future), "OTP should not be expired");

        // Test past time (expired)
        LocalDateTime past = LocalDateTime.now().minusMinutes(1);
        assertTrue(otpService.isOtpExpired(past), "OTP should be expired");
    }
}
