package com.quickserve.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String customerId;
    private String providerId;
    private String serviceId;
    private LocalDateTime bookingTime;
    private String status; // PENDING, CONFIRMED, COMPLETED, CANCELLED
    private String notes;
}
