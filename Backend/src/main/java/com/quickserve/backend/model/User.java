package com.quickserve.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String username;
    private String password;
    private String email;
    private String role; // CUSTOMER or PROVIDER
    private String fullName;
    private String bio;
    private String location;
    private String profilePictureUrl;
    private String phone;
    private String businessName;
}
