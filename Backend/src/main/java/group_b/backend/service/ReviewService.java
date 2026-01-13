package group_b.backend.service;

import group_b.backend.exception.ResourceNotFoundException;
import group_b.backend.model.Booking;
import group_b.backend.model.ProviderServiceEntity;
import group_b.backend.model.ServiceProvider;
import group_b.backend.repository.ProviderServiceRepository;
import group_b.backend.repository.ReviewRepository;
import group_b.backend.repository.ServiceProviderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ServiceProviderRepository serviceProviderRepository;
    private final ProviderServiceRepository providerServiceRepository;

    @Transactional
    public void updateStatsForNewReview(Booking booking) {
        // Update OVERALL Provider Rating
        Long providerId = Objects.requireNonNull(booking.getProvider().getId(), "Provider ID must not be null");
        updateProviderAverageRating(providerId);

        // Update SPECIFIC Service Rating (Only if it wasn't a custom request without a linked service)
        if (booking.getService() != null) {
            Long serviceId = booking.getService().getId();
            updateServiceStats(Objects.requireNonNull(serviceId, "Service ID must not be null"));
        }
    }

    // Helper method to update a provider's average rating
    private void updateProviderAverageRating(@NonNull Long providerId) {
        ServiceProvider provider = serviceProviderRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceProvider not found with id: " + providerId));

        Double averageRating = reviewRepository.getAverageRatingByProviderId(providerId);
        provider.setRating(averageRating != null ? BigDecimal.valueOf(averageRating).setScale(1, RoundingMode.HALF_UP) : BigDecimal.ZERO);
        serviceProviderRepository.save(provider);
    }

    // NEW METHOD: Updates the specific service's rating and review count
    private void updateServiceStats(@NonNull Long serviceId) {
        ProviderServiceEntity service = providerServiceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));

        Double newAvg = reviewRepository.getServiceAverageRating(serviceId);
        Integer newCount = reviewRepository.getServiceReviewCount(serviceId);

        service.setRating(newAvg != null ? BigDecimal.valueOf(newAvg).setScale(1, RoundingMode.HALF_UP) : BigDecimal.ZERO);
        service.setReviewCount(newCount != null ? newCount : 0);

        providerServiceRepository.save(service);
    }
}