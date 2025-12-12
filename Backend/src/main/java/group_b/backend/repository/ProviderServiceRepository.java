package group_b.backend.repository;

import group_b.backend.model.ProviderServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProviderServiceRepository extends JpaRepository<ProviderServiceEntity, Long> {
    List<ProviderServiceEntity> findByProviderId(Long providerId);
}