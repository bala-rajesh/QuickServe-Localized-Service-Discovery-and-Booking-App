package com.quickserve.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class User {
    @Id
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
