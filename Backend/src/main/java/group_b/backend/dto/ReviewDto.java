package group_b.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewDto {
    private Long id;
    private int rating;
    private String comment;
    private String customerName;
    private LocalDateTime createdAt;
}