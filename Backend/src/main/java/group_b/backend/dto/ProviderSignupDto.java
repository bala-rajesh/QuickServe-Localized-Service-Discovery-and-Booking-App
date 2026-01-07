package group_b.backend.dto;

import lombok.Data;

@Data
public class ProviderSignupDto {
    private String businessName;
    private String fullName;
    private String email;
    private String phone;
    private String category;
    private String pincode;
    private String address;
    private String bioShort;
    private String about;
    private String password;
}