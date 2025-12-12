package group_b.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalTime;
import java.time.DayOfWeek;

@Entity
@Table(name = "provider_working_hours")
@Data
public class ProviderWorkingHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id")
    private ServiceProvider provider;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week", updatable = false)
    private DayOfWeek dayOfWeek;

    @Column(name = "open_time")
    private LocalTime openTime;

    @Column(name = "close_time")
    private LocalTime closeTime;

    @Column(name = "is_closed")
    private boolean isClosed;
}