package group_b.backend.dto;

import lombok.Data;

@Data
public class JwtResponse {
    private Long id;
    private String role;
    private String type = "Bearer";

    public JwtResponse(Long id, String role) {
        this.id = id;
        this.role = role;
    }
}