package group_b.backend.controller;

import group_b.backend.dto.CustomerProfileDto;
import group_b.backend.dto.SearchResultDto;
import group_b.backend.dto.BookingDto;
import group_b.backend.dto.ReviewDto;
import group_b.backend.dto.ServiceSearchResultDto;
import group_b.backend.dto.CreateBookingRequestDto;
import group_b.backend.dto.RescheduleBookingRequestDto;
import group_b.backend.service.BookingService;
import group_b.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private BookingService bookingService;

    @GetMapping("/profile")
    public ResponseEntity<CustomerProfileDto> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(customerService.getProfile(email));
    }

    @PutMapping("/profile")
    public ResponseEntity<CustomerProfileDto> updateProfile(@RequestBody CustomerProfileDto profileUpdate) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(customerService.updateProfile(email, profileUpdate));
    }

    @GetMapping("/search")
    public ResponseEntity<List<SearchResultDto>> searchServiceProviders(
            @RequestParam(required = false, defaultValue = "") String query) {
        return ResponseEntity.ok(customerService.searchServiceProviders(query));
    }

    @GetMapping("/services/search")
    public ResponseEntity<List<ServiceSearchResultDto>> searchServices(
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "all") String category) {
        return ResponseEntity.ok(customerService.searchServices(query, category));
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Map<String, Object>>> getBookings(
            @RequestParam(required = false, defaultValue = "All") String status,
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "") String serviceType) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(customerService.getBookings(email, status, query, serviceType));
    }

    @PostMapping("/book")
    public ResponseEntity<BookingDto> createBooking(@RequestBody CreateBookingRequestDto requestDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(bookingService.createBooking(email, requestDto));
    }

    @PutMapping("/book/{bookingId}")
    public ResponseEntity<BookingDto> rescheduleBooking(@PathVariable Long bookingId,
            @RequestBody RescheduleBookingRequestDto requestDto) {
        return ResponseEntity.ok(bookingService.rescheduleBooking(bookingId, requestDto));
    }

    @DeleteMapping("/book/{bookingId}")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        bookingService.cancelBooking(bookingId, email);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/booking-stats")
    public ResponseEntity<Map<String, Object>> getBookingStats() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(customerService.getBookingStats(email));
    }

    @GetMapping("/providers/{providerId}/reviews")
    public ResponseEntity<List<ReviewDto>> getProviderReviews(@PathVariable Long providerId) {
        return ResponseEntity.ok(customerService.getLatestReviewsForProvider(providerId));
    }
}