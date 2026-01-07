package group_b.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "provider_services")
@Data
public class ProviderServiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id")
    private ServiceProvider provider;

    private String name;
    private String description; // Add this line
    private BigDecimal price;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "duration")
    private Integer duration;
}