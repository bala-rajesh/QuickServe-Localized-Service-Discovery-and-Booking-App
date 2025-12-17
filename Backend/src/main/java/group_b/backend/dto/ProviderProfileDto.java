package group_b.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProviderProfileDto {
    private String fullName;
    private String email;
    private String phone;
    private String businessName;
    private String category;
    private String pincode;
    private String serviceArea;
    private String bio;
    private String about;
    private String profileImageUrl;
    private List<WorkingHourDTO> workingHours;
}