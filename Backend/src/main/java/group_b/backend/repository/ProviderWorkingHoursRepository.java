package group_b.backend.repository;

import group_b.backend.model.ProviderWorkingHours;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProviderWorkingHoursRepository extends JpaRepository<ProviderWorkingHours, Long> {
    List<ProviderWorkingHours> findByProviderId(Long providerId);
}