package group_b.backend.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ServiceSearchResultDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer duration;
    private Long providerId;
    private String providerName;
    private BigDecimal providerRating;
    private Double latitude;
    private Double longitude;
    private String providerAddress;
    private String pincode; // Added to include provider's pincode
    private BigDecimal serviceRating; // New field for service-specific rating
    private Integer serviceReviewCount; // New field for service-specific review count
}