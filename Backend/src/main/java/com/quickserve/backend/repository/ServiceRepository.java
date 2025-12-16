package com.quickserve.backend.repository;

import com.quickserve.backend.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, String> {
    List<Service> findByCategory(String category);

    List<Service> findByProviderId(String providerId);
}
