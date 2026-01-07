package group_b.backend.dto;

import group_b.backend.model.BookingStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BookingDto {
    private Long bookingId;
    private String serviceTitle;
    private String customerName;
    private String jobLocationAddress; // Will be nulled based on status
    private String customerContactPhone; // Will be nulled based on status
    private BigDecimal agreedPrice;
    private String description;
    private LocalDate scheduledDate;
    private LocalTime scheduledTime;
    private BookingStatus status;
}