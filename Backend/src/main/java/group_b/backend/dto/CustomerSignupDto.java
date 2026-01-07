package group_b.backend.dto;

import lombok.Data;

@Data
// DTO for Customer Signup
public class CustomerSignupDto {
    private String fullName;
    private String phone;
    private String email;
    private String address;
    private String pincode;
    private String password;
}