package com.quickserve.backend.payload;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
