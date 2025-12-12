package group_b.backend.repository;

import group_b.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.booking.provider.id = :providerId")
    Double getAverageRatingByProviderId(@Param("providerId") Long providerId);
}