package group_b.backend.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class SearchResultDto {
    private Long id;
    private String businessName;
    private String category;
    private String bioShort;
    private String address;
    private String pincode;

    // New fields for UI
    private BigDecimal rating;
    private String experience;
    private Integer completedJobs;
    private String phone;
    private String email;
    private List<String> skills;
}