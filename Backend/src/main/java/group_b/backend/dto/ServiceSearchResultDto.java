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
}