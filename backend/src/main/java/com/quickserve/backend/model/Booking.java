package com.quickserve.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "bookings")
public class Booking {
    @Id
    private String id;
    private String customerId;
    private String providerId;
    private String serviceId;
    private LocalDateTime bookingTime;
    private String status; // PENDING, CONFIRMED, COMPLETED, CANCELLED
    private String notes;
}
