package group_b.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewDto {
    private Long id;
    private Long bookingId; // Added to link review to a booking on creation
    private Integer rating;
    private String comment;
    private String customerName;
    private LocalDateTime createdAt;
}