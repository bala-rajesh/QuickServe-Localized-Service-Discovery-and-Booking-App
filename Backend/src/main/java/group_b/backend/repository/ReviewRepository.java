package group_b.backend.repository;

import group_b.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findTop5ByBooking_Provider_IdOrderByCreatedAtDesc(Long providerId);

    // Added for checking if a review already exists for a booking
    Optional<Review> findByBookingId(Long bookingId);

    List<Review> findTop5ByBooking_Service_IdOrderByCreatedAtDesc(Long serviceId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.booking.provider.id = :providerId")
    Double getAverageRatingByProviderId(Long providerId);

    // Calculate Average Rating for a specific SERVICE
    @Query("SELECT AVG(r.rating) FROM Review r JOIN r.booking b WHERE b.service.id = :serviceId")
    Double getServiceAverageRating(@Param("serviceId") Long serviceId);

    // Count Reviews for a specific SERVICE
    @Query("SELECT COUNT(r) FROM Review r JOIN r.booking b WHERE b.service.id = :serviceId")
    Integer getServiceReviewCount(@Param("serviceId") Long serviceId);
}