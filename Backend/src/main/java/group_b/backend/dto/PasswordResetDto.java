package group_b.backend.dto;

import lombok.Data;

public class PasswordResetDto {

    @Data
    public static class ForgotPasswordRequest {
        private String email;
    }

    @Data
    public static class ResetPasswordRequest {
        private String token;
        private String newPassword;
    }
}
