package group_b.backend.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class WorkingHourDTO {
    private String day;
    private LocalTime open;
    private LocalTime close;
    private boolean isClosed;
}