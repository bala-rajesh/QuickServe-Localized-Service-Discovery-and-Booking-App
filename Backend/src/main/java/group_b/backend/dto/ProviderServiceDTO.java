package group_b.backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProviderServiceDTO {
    private Long id;
    private String name;
    private String description; // Add this line
    private BigDecimal price;
    private boolean active;
}