package com.quickserve.backend.repository;

import com.quickserve.backend.model.Service;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ServiceRepository extends MongoRepository<Service, String> {
    List<Service> findByCategory(String category);

    List<Service> findByProviderId(String providerId);
}
