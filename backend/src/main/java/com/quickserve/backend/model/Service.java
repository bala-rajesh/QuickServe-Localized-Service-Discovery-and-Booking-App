package com.quickserve.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "services")
public class Service {
    @Id
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
