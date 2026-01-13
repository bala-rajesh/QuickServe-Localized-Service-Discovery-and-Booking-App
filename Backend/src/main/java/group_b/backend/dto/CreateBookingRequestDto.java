package group_b.backend.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class CreateBookingRequestDto {
    private Long providerId;
    private Long serviceId; // Added to link to a specific service
    private String serviceTitle;
    private String customerName; // This might be redundant if customer is identified by email
    private String phone;
    private String address;
    private LocalDate date;
    private LocalTime time;
    private BigDecimal price;
    private String description;
}