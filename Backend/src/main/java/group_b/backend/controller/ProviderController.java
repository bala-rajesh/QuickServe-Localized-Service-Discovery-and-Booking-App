package group_b.backend.controller;

import group_b.backend.dto.BookingDto;
import group_b.backend.dto.PaginatedResponseDto;
import group_b.backend.dto.EarningsAnalyticsDto;
import group_b.backend.dto.ProviderDashboardDto;
import group_b.backend.dto.ProviderProfileDto;
import group_b.backend.dto.ProviderServiceDTO;
import group_b.backend.model.BookingStatus;
import group_b.backend.service.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/provider")
@RequiredArgsConstructor
public class ProviderController {

    private final ProviderService providerService;

    // This is a placeholder for getting the authenticated provider's ID.
    // In a real application, this would come from the security context.
    private Long getAuthenticatedProviderId() {
        return 1L;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ProviderDashboardDto> getDashboard() {
        Long providerId = getAuthenticatedProviderId();
        ProviderDashboardDto dashboardData = providerService.getDashboardData(providerId);
        return ResponseEntity.ok(dashboardData);
    }

    @GetMapping("/bookings")
    public ResponseEntity<PaginatedResponseDto<BookingDto>> getBookings(
            @RequestParam(required = false) BookingStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            Pageable pageable) {
        Long providerId = getAuthenticatedProviderId();
        PaginatedResponseDto<BookingDto> bookings = providerService.getBookings(providerId, status, startDate, endDate, pageable);
        return ResponseEntity.ok(bookings);
    }

    @PatchMapping("/bookings/{id}/status")
    public ResponseEntity<BookingDto> updateBookingStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {
        BookingStatus newStatus = BookingStatus.valueOf(payload.get("status").toUpperCase());
        BookingDto updatedBooking = providerService.updateBookingStatus(id, newStatus);
        return ResponseEntity.ok(updatedBooking);
    }

    @GetMapping("/profile")
    public ResponseEntity<ProviderProfileDto> getProfile() {
        Long providerId = getAuthenticatedProviderId();
        ProviderProfileDto profile = providerService.getProfileDetails(providerId);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<ProviderProfileDto> updateProfile(@RequestBody ProviderProfileDto profileDto) {
        Long providerId = getAuthenticatedProviderId();
        ProviderProfileDto updatedProfile = providerService.updateProfileDetails(providerId, profileDto);
        return ResponseEntity.ok(updatedProfile);
    }

    @GetMapping("/services")
    public ResponseEntity<List<ProviderServiceDTO>> getServices() {
        Long providerId = getAuthenticatedProviderId();
        List<ProviderServiceDTO> services = providerService.getAllServices(providerId);
        return ResponseEntity.ok(services);
    }

    @PutMapping("/services/{serviceId}")
    public ResponseEntity<ProviderServiceDTO> updateService(
            @PathVariable Long serviceId,
            @RequestBody ProviderServiceDTO serviceDto) {
        Long providerId = getAuthenticatedProviderId();
        ProviderServiceDTO updatedService = providerService.updateService(providerId, serviceId, serviceDto);
        return ResponseEntity.ok(updatedService);
    }

    @PostMapping("/services")
    public ResponseEntity<ProviderServiceDTO> createService(@RequestBody ProviderServiceDTO serviceDto) {
        Long providerId = getAuthenticatedProviderId();
        ProviderServiceDTO createdService = providerService.createService(providerId, serviceDto);
        return ResponseEntity.ok(createdService);
    }

    @DeleteMapping("/services/{serviceId}")
    public ResponseEntity<Void> deleteService(@PathVariable Long serviceId) {
        Long providerId = getAuthenticatedProviderId();
        providerService.deleteService(providerId, serviceId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/earnings")
    public ResponseEntity<EarningsAnalyticsDto> getEarnings(
            @RequestParam(defaultValue = "week") String filter,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Long providerId = getAuthenticatedProviderId();
        LocalDate queryDate = date != null ? date : LocalDate.now();
        EarningsAnalyticsDto earnings = providerService.getEarningsAnalytics(providerId, filter, queryDate);
        return ResponseEntity.ok(earnings);
    }
}