package group_b.backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class RescheduleBookingRequestDto {
    private LocalDate date;
    private LocalTime time;
    private String address;
    private String description;
    private String serviceTitle;
}