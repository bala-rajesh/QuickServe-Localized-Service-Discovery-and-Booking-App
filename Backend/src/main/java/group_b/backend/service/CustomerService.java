package group_b.backend.service;

import group_b.backend.dto.CustomerProfileDto;
import group_b.backend.dto.SearchResultDto;
import group_b.backend.dto.ReviewDto;
import group_b.backend.dto.ServiceSearchResultDto;
import group_b.backend.exception.ResourceNotFoundException;
import group_b.backend.model.Booking;
import group_b.backend.model.ProviderServiceEntity;
import group_b.backend.model.Review;
import group_b.backend.model.ServiceProvider;
import group_b.backend.model.User;
import group_b.backend.model.BookingStatus;
import group_b.backend.repository.BookingRepository;
import group_b.backend.repository.ProviderServiceRepository;
import group_b.backend.repository.ReviewRepository;
import group_b.backend.repository.ServiceProviderRepository;
import group_b.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final UserRepository userRepository;
    private final ServiceProviderRepository serviceProviderRepository;
    private final ProviderServiceRepository providerServiceRepository;
    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;

    public CustomerProfileDto getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        CustomerProfileDto profileDto = new CustomerProfileDto();
        profileDto.setId(user.getId());
        profileDto.setFullName(user.getFullName());
        profileDto.setEmail(user.getEmail());
        profileDto.setPhone(user.getPhone());
        profileDto.setAddress(user.getAddress());
        profileDto.setPincode(user.getPincode());

        return profileDto;
    }

    @Transactional
    public CustomerProfileDto updateProfile(String email, CustomerProfileDto profileUpdate) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        user.setFullName(profileUpdate.getFullName());
        user.setPhone(profileUpdate.getPhone());
        user.setAddress(profileUpdate.getAddress());
        user.setPincode(profileUpdate.getPincode());

        User updatedUser = userRepository.save(user);

        CustomerProfileDto responseDto = new CustomerProfileDto();
        responseDto.setId(updatedUser.getId());
        responseDto.setFullName(updatedUser.getFullName());
        responseDto.setEmail(updatedUser.getEmail());
        responseDto.setPhone(updatedUser.getPhone());
        responseDto.setAddress(updatedUser.getAddress());
        responseDto.setPincode(updatedUser.getPincode());

        return responseDto;
    }

    public List<SearchResultDto> searchServiceProviders(String query) {
        List<ServiceProvider> providers = serviceProviderRepository.findAll();

        return providers.stream()
                .filter(p -> {
                    if (query == null || query.isEmpty()) return true;
                    String q = query.toLowerCase();
                    return (p.getBusinessName() != null && p.getBusinessName().toLowerCase().contains(q)) ||
                           (p.getCategory() != null && p.getCategory().toLowerCase().contains(q)) ||
                           (p.getBioShort() != null && p.getBioShort().toLowerCase().contains(q));
                })
                .map(p -> {
                    SearchResultDto dto = new SearchResultDto();
                    dto.setId(p.getId());
                    dto.setBusinessName(p.getBusinessName());
                    dto.setCategory(p.getCategory());
                    dto.setBioShort(p.getBioShort());
                    dto.setAddress(p.getUser().getAddress());
                    dto.setPincode(p.getUser().getPincode());

                    dto.setPhone(p.getUser().getPhone());
                    dto.setEmail(p.getUser().getEmail());

                    dto.setRating(p.getRating() != null ? p.getRating() : BigDecimal.ZERO);
                    dto.setExperience(p.getExperience() != null ? p.getExperience() : "Not specified");
                    dto.setCompletedJobs(p.getCompletedJobs() != null ? p.getCompletedJobs() : 0);

                    if (p.getSkills() != null && !p.getSkills().isEmpty()) {
                        dto.setSkills(List.of(p.getSkills().split("\\s*,\\s*")));
                    } else {
                        dto.setSkills(Collections.emptyList());
                    }

                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<ServiceSearchResultDto> searchServices(String query, String category) {
        List<ProviderServiceEntity> services = providerServiceRepository.findAll(); // In a real app, this would be a more efficient query

        return services.stream()
                .filter(ProviderServiceEntity::isActive)
                .filter(service -> {
                    boolean categoryMatch = "all".equalsIgnoreCase(category) || service.getProvider().getCategory().equalsIgnoreCase(category);
                    boolean queryMatch = query == null || query.isEmpty() ||
                            service.getName().toLowerCase().contains(query.toLowerCase()) ||
                            (service.getDescription() != null && service.getDescription().toLowerCase().contains(query.toLowerCase())) ||
                            service.getProvider().getBusinessName().toLowerCase().contains(query.toLowerCase());
                    return categoryMatch && queryMatch;
                })
                .map(this::mapToServiceSearchResultDto)
                .collect(Collectors.toList());
    }

    private ServiceSearchResultDto mapToServiceSearchResultDto(ProviderServiceEntity service) {
        ServiceSearchResultDto dto = new ServiceSearchResultDto();
        dto.setId(service.getId());
        dto.setName(service.getName());
        dto.setDescription(service.getDescription());
        dto.setPrice(service.getPrice());
        dto.setDuration(service.getDuration());
        
        ServiceProvider provider = service.getProvider();
        if (provider != null) {
            dto.setProviderId(provider.getId());
            dto.setProviderName(provider.getBusinessName());
            dto.setProviderRating(provider.getRating() != null ? provider.getRating() : BigDecimal.ZERO);
        }
        return dto;
    }

    public List<ReviewDto> getLatestReviewsForProvider(Long providerId) {
        // This assumes a method exists in ReviewRepository to fetch reviews by provider ID.
        // A more direct link from Review to ServiceProvider would be ideal.
        // This query would join through Booking.
        return reviewRepository.findTop5ByBooking_Provider_IdOrderByCreatedAtDesc(providerId)
                .stream()
                .map(this::mapToReviewDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getBookings(String email, String statusFilter, String searchQuery, String serviceType) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Booking> bookings = bookingRepository.findAll().stream()
                .filter(b -> b.getCustomer() != null && b.getCustomer().getId().equals(user.getId()))
                .filter(b -> {
                    // Status Filter
                    if (statusFilter != null && !statusFilter.isEmpty() && !statusFilter.equalsIgnoreCase("All")) {
                        BookingStatus bs = b.getStatus();
                        if (statusFilter.equalsIgnoreCase("Booked") && bs != BookingStatus.CONFIRMED) return false;
                        if (statusFilter.equalsIgnoreCase("In Progress") && bs != BookingStatus.PENDING) return false;
                        if (statusFilter.equalsIgnoreCase("Cancelled") && bs != BookingStatus.CANCELLED) return false;
                        if (statusFilter.equalsIgnoreCase("Rejected") && bs != BookingStatus.REJECTED) return false;
                    }
                    // Query Filter (Search Term)
                    if (searchQuery != null && !searchQuery.isEmpty()) {
                        String q = searchQuery.toLowerCase();
                        String serviceTitle = b.getServiceTitle() != null ? b.getServiceTitle().toLowerCase() : "";
                        String providerName = b.getProvider() != null ? b.getProvider().getBusinessName().toLowerCase() : "";
                        if (!serviceTitle.contains(q) && !providerName.contains(q)) return false;
                    }
                    // Service Type Filter
                    if (serviceType != null && !serviceType.isEmpty()) {
                        String st = serviceType.toLowerCase();
                        String serviceTitle = b.getServiceTitle() != null ? b.getServiceTitle().toLowerCase() : "";
                        if (!serviceTitle.contains(st)) return false;
                    }
                    return true;
                })
                .collect(Collectors.toList());

        return bookings.stream().map(b -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", b.getId());
            map.put("providerName", b.getProvider() != null ? b.getProvider().getBusinessName() : "Unknown Provider");
            map.put("serviceType", b.getServiceTitle());
            map.put("date", b.getScheduledDate() != null ? b.getScheduledDate().toString() : "");
            map.put("time", b.getScheduledTime() != null ? b.getScheduledTime().toString() : "");
            map.put("price", b.getAgreedPrice());
            map.put("address", b.getJobLocationAddress());
            
            String status = "UNKNOWN";
            if (b.getStatus() != null) {
                if (b.getStatus() == BookingStatus.CONFIRMED) status = "Booked";
                else if (b.getStatus() == BookingStatus.PENDING) status = "In Progress";
                else if (b.getStatus() == BookingStatus.CANCELLED) status = "Cancelled";
                else if (b.getStatus() == BookingStatus.REJECTED) status = "Rejected";
                else status = b.getStatus().name();
            }
            map.put("status", status);
            map.put("image", (b.getProvider() != null) ? b.getProvider().getProfileImageUrl() : null);
            map.put("description", b.getDescription() != null ? b.getDescription() : b.getServiceTitle());
            return map;
        }).collect(Collectors.toList());
    }

    public Map<String, Object> getBookingStats(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Booking> allBookings = bookingRepository.findAll().stream()
                .filter(b -> b.getCustomer() != null && b.getCustomer().getId().equals(user.getId()))
                .collect(Collectors.toList());

        long totalBooked = allBookings.size();

        LocalDate now = LocalDate.now();
        LocalDate startOfWeek = now.with(DayOfWeek.MONDAY);
        LocalDate endOfWeek = now.with(DayOfWeek.SUNDAY);

        long thisWeek = allBookings.stream()
                .filter(b -> b.getScheduledDate() != null &&
                        !b.getScheduledDate().isBefore(startOfWeek) &&
                        !b.getScheduledDate().isAfter(endOfWeek))
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBooked", totalBooked);
        stats.put("thisWeek", thisWeek);

        return stats;
    }

    private ReviewDto mapToReviewDto(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        // To avoid exposing full user details, we just use the name.
        dto.setCustomerName(review.getBooking().getCustomer().getFullName());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
}