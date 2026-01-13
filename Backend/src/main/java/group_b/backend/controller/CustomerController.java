package group_b.backend.controller;

import group_b.backend.dto.BookingDto;
import group_b.backend.dto.CustomerProfileDto;
import group_b.backend.dto.RescheduleBookingRequestDto;
import group_b.backend.dto.ReviewDto;
import group_b.backend.dto.SearchResultDto;
import group_b.backend.dto.ServiceSearchResponseDto;
import group_b.backend.service.BookingService;
import group_b.backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
    private final BookingService bookingService;

    @GetMapping("/profile")
    public ResponseEntity<CustomerProfileDto> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(customerService.getProfile(userDetails.getUsername()));
    }

    @PutMapping("/profile")
    public ResponseEntity<CustomerProfileDto> updateProfile(@AuthenticationPrincipal UserDetails userDetails, @RequestBody CustomerProfileDto profileUpdate) {
        return ResponseEntity.ok(customerService.updateProfile(userDetails.getUsername(), profileUpdate));
    }

    @GetMapping("/search")
    public List<SearchResultDto> searchProviders(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String pincode,
            @AuthenticationPrincipal UserDetails userDetails) {

        String userEmail = null;
        if (userDetails != null) {
            userEmail = userDetails.getUsername();
        }

        // Pass null for email if user is not authenticated
        return customerService.searchServiceProviders(query, pincode, userEmail);
    }

    @GetMapping("/services/search")
    public ServiceSearchResponseDto searchServices(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "all") String category,
            @RequestParam(required = false) String pincode,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            throw new SecurityException("User must be authenticated to search services.");
        }
        String userEmail = userDetails.getUsername();
        return customerService.searchServices(query, category, pincode, userEmail);
    }

    @GetMapping("/bookings")
    public List<Map<String, Object>> getBookings(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String serviceType) {
        return customerService.getBookings(userDetails.getUsername(), status, query, serviceType);
    }

    @GetMapping("/booking-stats")
    public Map<String, Object> getBookingStats(@AuthenticationPrincipal UserDetails userDetails) {
        return customerService.getBookingStats(userDetails.getUsername());
    }

    @PostMapping("/reviews")
    public ReviewDto createReview(@AuthenticationPrincipal UserDetails userDetails, @RequestBody ReviewDto reviewDto) {
        return customerService.createReview(userDetails.getUsername(), reviewDto);
    }

    @GetMapping("/services/{serviceId}/reviews")
    public List<ReviewDto> getServiceReviews(@PathVariable Long serviceId) {
        return customerService.getLatestReviewsForService(serviceId);
    }

    @PutMapping("/book/{bookingId}")
    public BookingDto rescheduleBooking(@PathVariable Long bookingId, @RequestBody RescheduleBookingRequestDto dto) {
        return bookingService.rescheduleBooking(bookingId, dto);
    }

    @PutMapping("/bookings/{bookingId}/cancel")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId, @AuthenticationPrincipal UserDetails userDetails) {
        bookingService.cancelBooking(bookingId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}