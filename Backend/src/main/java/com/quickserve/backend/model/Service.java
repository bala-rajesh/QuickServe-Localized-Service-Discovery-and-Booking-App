package com.quickserve.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String providerId;
    private String name;
    private String description;
    private String category;
    private double price;
    private String duration; // e.g., "1 hour"
    private String location;
    private double rating;
    private int reviewCount;
}
