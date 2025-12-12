package com.quickserve.backend.repository;

import com.quickserve.backend.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByCustomerId(String customerId);

    List<Booking> findByProviderId(String providerId);
}
