package group_b.backend.service;

import group_b.backend.dto.BookingDto;
import group_b.backend.dto.CreateBookingRequestDto;
import group_b.backend.dto.RescheduleBookingRequestDto;
import group_b.backend.exception.ResourceNotFoundException;
import group_b.backend.model.Booking;
import group_b.backend.model.BookingStatus;
import group_b.backend.model.ServiceProvider;
import group_b.backend.model.User;
import group_b.backend.repository.BookingRepository;
import group_b.backend.repository.ServiceProviderRepository;
import group_b.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ServiceProviderRepository serviceProviderRepository;

    @Transactional
    public BookingDto createBooking(String userEmail, CreateBookingRequestDto requestDto) {
        User customer = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        ServiceProvider provider = serviceProviderRepository
                .findById(Objects.requireNonNull(requestDto.getProviderId(), "Provider ID must not be null"))
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Provider not found with id: " + requestDto.getProviderId()));

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setProvider(provider);
        booking.setServiceTitle(requestDto.getServiceTitle());
        booking.setJobLocationAddress(requestDto.getAddress());
        booking.setCustomerContactPhone(requestDto.getPhone());
        booking.setAgreedPrice(requestDto.getPrice());
        booking.setScheduledDate(requestDto.getDate());
        booking.setScheduledTime(requestDto.getTime());
        booking.setStatus(BookingStatus.PENDING);
        booking.setCreatedAt(LocalDateTime.now());

        // Setting the description as requested
        booking.setDescription(requestDto.getDescription());

        Booking savedBooking = bookingRepository.save(booking);
        return mapToDto(savedBooking);
    }

    @Transactional
    public BookingDto rescheduleBooking(Long bookingId, RescheduleBookingRequestDto dto) {
        Booking booking = bookingRepository.findById(Objects.requireNonNull(bookingId, "Booking ID must not be null"))
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        booking.setScheduledDate(dto.getDate());
        booking.setScheduledTime(dto.getTime());
        booking.setJobLocationAddress(dto.getAddress());
        booking.setDescription(dto.getDescription());
        if (dto.getServiceTitle() != null && !dto.getServiceTitle().isEmpty()) {
            booking.setServiceTitle(dto.getServiceTitle());
        }
        booking.setStatus(BookingStatus.PENDING); // Reset status to PENDING for provider confirmation

        return mapToDto(bookingRepository.save(booking));
    }

    @Transactional
    public void cancelBooking(Long bookingId, String customerEmail) {
        Booking booking = bookingRepository.findById(Objects.requireNonNull(bookingId, "Booking ID must not be null"))
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        // Verify ownership - customer must own this booking
        if (!booking.getCustomer().getEmail().equals(customerEmail)) {
            throw new SecurityException("Unauthorized: You can only cancel your own bookings");
        }

        // Only allow cancellation of pending or confirmed bookings
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new IllegalStateException("Booking is already cancelled");
        }
        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new IllegalStateException("Cannot cancel completed booking");
        }
        if (booking.getStatus() == BookingStatus.REJECTED) {
            throw new IllegalStateException("Cannot cancel rejected booking");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    private BookingDto mapToDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setBookingId(booking.getId());
        dto.setServiceTitle(booking.getServiceTitle());
        if (booking.getCustomer() != null) {
            dto.setCustomerName(booking.getCustomer().getFullName());
        }
        dto.setJobLocationAddress(booking.getJobLocationAddress());
        dto.setCustomerContactPhone(booking.getCustomerContactPhone());
        dto.setAgreedPrice(booking.getAgreedPrice());
        dto.setScheduledDate(booking.getScheduledDate());
        dto.setScheduledTime(booking.getScheduledTime());
        dto.setStatus(booking.getStatus());
        dto.setDescription(booking.getDescription());
        return dto;
    }
}