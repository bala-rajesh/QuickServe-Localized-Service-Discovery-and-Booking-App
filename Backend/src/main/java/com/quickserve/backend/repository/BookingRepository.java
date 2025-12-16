package com.quickserve.backend.repository;

import com.quickserve.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findByCustomerId(String customerId);

    List<Booking> findByProviderId(String providerId);
}
