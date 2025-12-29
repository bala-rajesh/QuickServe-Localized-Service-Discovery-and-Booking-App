package group_b.backend.dto;

import lombok.Data;

@Data
public class CustomerProfileDto {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String pincode;
}