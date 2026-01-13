package group_b.backend.service;

import group_b.backend.dto.CustomerProfileDto;
import group_b.backend.dto.SearchResultDto;
import group_b.backend.dto.ReviewDto;
import group_b.backend.dto.ServiceSearchResultDto;
import group_b.backend.dto.ServiceSearchResponseDto;
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
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
    private final ReviewService reviewService; // Inject the new ReviewService

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

    public List<SearchResultDto> searchServiceProviders(String query, String pincode, String userEmail) {
        String effectivePincode = pincode;
        // If no pincode is provided AND a user is logged in, use their pincode as default.
        if ((effectivePincode == null || effectivePincode.isBlank()) && userEmail != null) {
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found for email: " + userEmail));
            effectivePincode = user.getPincode();
        }
        final String finalPincode = effectivePincode;

        List<ServiceProvider> providers = serviceProviderRepository.findAll();

        return providers.stream()
                .filter(p -> {
                    // Pincode Filter: If a pincode is specified, filter by it.
                    if (finalPincode != null && !finalPincode.isEmpty()) {
                        String providerPincode = p.getUser() != null ? p.getUser().getPincode() : null;
                        if (!doPincodesMatch(finalPincode, providerPincode)) {
                            return false; // Exclude if pincodes don't match
                        }
                    }

                    if (query == null || query.isEmpty())
                        return true;
                    String q = query.toLowerCase();
                    // Improved category matching to handle variations like 'plumber' vs 'plumbing'.
                    return (p.getBusinessName() != null && p.getBusinessName().toLowerCase().contains(q)) ||
                            (p.getCategory() != null && (p.getCategory().toLowerCase().contains(q) || q.contains(p.getCategory().toLowerCase()))) ||
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

                    // DATABASE: Map location coordinates for map integration
                    dto.setLatitude(p.getLatitude());
                    dto.setLongitude(p.getLongitude());

                    return dto;
                })
                .collect(Collectors.toList());
    }

    public ServiceSearchResponseDto searchServices(String query, String category, String pincode, String userEmail) {
        String effectivePincode = pincode;
        if (effectivePincode == null || effectivePincode.isBlank()) {
            // If no pincode is provided, use the logged-in user's pincode.
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found for email: " + userEmail));
            effectivePincode = user.getPincode();
        }

        final String finalPincode = effectivePincode;

        List<ProviderServiceEntity> services = providerServiceRepository.findAll(); // In a real app, this would be a
                                                                                    // more efficient query

        List<ServiceSearchResultDto> filteredServices = services.stream()
                .filter(ProviderServiceEntity::isActive)
                .filter(service -> {
                    ServiceProvider provider = service.getProvider();
                    // A service is only searchable if it has an active provider
                    // with a user account and a business name.
                    if (provider == null || provider.getUser() == null || provider.getBusinessName() == null || provider.getBusinessName().isEmpty()) {
                        return false;
                    }

                    // Pincode Filter: Only include providers in the specified or user's local area.
                    if (finalPincode != null && !finalPincode.isEmpty()) {
                        String providerPincode = provider.getUser().getPincode();
                        if (!doPincodesMatch(finalPincode, providerPincode)) {
                            return false; // Exclude if pincodes don't match
                        }
                    }

                    boolean categoryMatch = "all".equalsIgnoreCase(category)
                            || (provider.getCategory() != null && provider.getCategory().toLowerCase().contains(category.toLowerCase()));
                    boolean queryMatch = query == null || query.isEmpty() ||
                            (service.getName() != null && service.getName().toLowerCase().contains(query.toLowerCase())) ||
                            (service.getDescription() != null && service.getDescription().toLowerCase().contains(query.toLowerCase())) ||
                            (provider.getBusinessName() != null && provider.getBusinessName().toLowerCase().contains(query.toLowerCase()));
                    return categoryMatch && queryMatch;
                })
                .map(this::mapToServiceSearchResultDto)
                .collect(Collectors.toList());

        return new ServiceSearchResponseDto(filteredServices, finalPincode);
    }

    /**
     * Helper method to compare two pincodes.
     * It performs a prefix match on the first 3 characters if both pincodes are long enough.
     * Otherwise, it falls back to an exact match.
     */
    private boolean doPincodesMatch(String searchPincode, String providerPincode) {
        if (searchPincode == null || searchPincode.isBlank() || providerPincode == null || providerPincode.isBlank()) {
            return false;
        }

        String trimmedSearch = searchPincode.trim();
        String trimmedProvider = providerPincode.trim();

        if (trimmedSearch.length() >= 3 && trimmedProvider.length() >= 3) {
            return trimmedSearch.substring(0, 3).equals(trimmedProvider.substring(0, 3));
        } else {
            return trimmedSearch.equals(trimmedProvider);
        }
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

            // DATABASE: Map provider location data for map integration
            dto.setLatitude(provider.getLatitude());
            dto.setLongitude(provider.getLongitude());
            if (provider.getUser() != null) {
                dto.setProviderAddress(provider.getUser().getAddress());
                dto.setPincode(provider.getUser().getPincode());
            }
            dto.setServiceRating(service.getRating());
            dto.setServiceReviewCount(service.getReviewCount());
        }
        return dto;
    }

    @Transactional
    public List<ReviewDto> getLatestReviewsForService(Long serviceId) {
        return reviewRepository.findTop5ByBooking_Service_IdOrderByCreatedAtDesc(serviceId).stream().map(this::mapToReviewDto).collect(Collectors.toList());
    }
    @Transactional
    public ReviewDto createReview(String customerEmail, ReviewDto reviewDto) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with email: " + customerEmail));

        Booking booking = bookingRepository.findById(reviewDto.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + reviewDto.getBookingId()));

        // Ensure the booking belongs to the customer
        if (!booking.getCustomer().getId().equals(customer.getId())) {
            throw new SecurityException("Unauthorized: Booking does not belong to this customer.");
        }

        // Ensure the booking is completed before reviewing
        if (booking.getStatus() != BookingStatus.COMPLETED) {
            throw new IllegalStateException("Cannot review a booking that is not completed.");
        }

        // Check if a review already exists for this booking
        if (reviewRepository.findByBookingId(booking.getId()).isPresent()) {
            throw new IllegalStateException("A review already exists for this booking.");
        }

        Review review = new Review();
        review.setBooking(booking);
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());
        review.setCreatedAt(LocalDateTime.now());

        Review savedReview = reviewRepository.save(review);
        reviewService.updateStatsForNewReview(booking); // Delegate to ReviewService to update provider/service stats
        return mapToReviewDto(savedReview);
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getBookings(String email, String statusFilter, String searchQuery,
            String serviceType) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Booking> bookings = bookingRepository.findAll().stream()
                .filter(b -> b.getCustomer() != null && b.getCustomer().getId().equals(user.getId()))
                .filter(b -> {
                    // Status Filter Logic
                    if (statusFilter != null && !statusFilter.isEmpty() && !statusFilter.equalsIgnoreCase("All")) {
                        BookingStatus bs = b.getStatus();
                        boolean match;
                        switch (statusFilter.toLowerCase()) {
                            case "booked":
                                match = (bs == BookingStatus.CONFIRMED);
                                break;
                            case "in progress":
                                match = (bs == BookingStatus.PENDING);
                                break;
                            case "completed":
                                match = (bs == BookingStatus.COMPLETED);
                                break;
                            case "cancelled":
                                match = (bs == BookingStatus.CANCELLED || bs == BookingStatus.REJECTED);
                                break;
                            default:
                                match = false; // Should not happen with controlled tabs
                        }
                        if (!match) return false;
                    }
                    // Query Filter (Search Term)
                    if (searchQuery != null && !searchQuery.isEmpty()) {
                        String q = searchQuery.toLowerCase();
                        String serviceTitle = b.getServiceTitle() != null ? b.getServiceTitle().toLowerCase() : "";
                        String providerName = b.getProvider() != null ? b.getProvider().getBusinessName().toLowerCase()
                                : "";
                        if (!serviceTitle.contains(q) && !providerName.contains(q))
                            return false;
                    }
                    // Service Type Filter
                    if (serviceType != null && !serviceType.isEmpty()) {
                        String st = serviceType.toLowerCase();
                        String serviceTitle = b.getServiceTitle() != null ? b.getServiceTitle().toLowerCase() : "";
                        if (!serviceTitle.contains(st))
                            return false;
                    }
                    return true;
                })
                .collect(Collectors.toList());

        return bookings.stream().map(b -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", b.getId());
            map.put("serviceId", b.getService() != null ? b.getService().getId() : null); // Add serviceId
            map.put("providerName", b.getProvider() != null ? b.getProvider().getBusinessName() : "Unknown Provider");
            map.put("serviceType", b.getServiceTitle());
            map.put("date", b.getScheduledDate() != null ? b.getScheduledDate().toString() : "");
            map.put("time", b.getScheduledTime() != null ? b.getScheduledTime().toString() : "");
            map.put("price", b.getAgreedPrice());
            map.put("address", b.getJobLocationAddress());

            String status = "UNKNOWN";
            if (b.getStatus() != null) {
                switch (b.getStatus()) {
                    case CONFIRMED: status = "Booked"; break;
                    case PENDING: status = "In Progress"; break;
                    case COMPLETED: status = "Completed"; break;
                    case CANCELLED: status = "Cancelled"; break;
                    case REJECTED: status = "Rejected"; break;
                    default: status = b.getStatus().name(); break;
                }
            }
            map.put("status", status);
            map.put("image", (b.getProvider() != null) ? b.getProvider().getProfileImageUrl() : null);
            map.put("description", b.getDescription() != null ? b.getDescription() : b.getServiceTitle());
            // Add a flag to indicate if the booking has already been reviewed.
            // This allows the frontend to hide the 'Rate' button if a review exists.
            map.put("isReviewed", reviewRepository.findByBookingId(b.getId()).isPresent());

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