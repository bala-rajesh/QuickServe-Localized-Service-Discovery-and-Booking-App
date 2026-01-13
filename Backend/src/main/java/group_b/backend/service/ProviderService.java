package group_b.backend.service;

import group_b.backend.dto.BookingDto;
import group_b.backend.dto.EarningsAnalyticsDto;
import group_b.backend.dto.ProviderDashboardDto;
import group_b.backend.dto.PaginatedResponseDto;
import group_b.backend.dto.ProviderProfileDto;
import group_b.backend.dto.ProviderServiceDTO;
import group_b.backend.dto.WorkingHourDTO;
import group_b.backend.model.Booking;
import group_b.backend.model.BookingStatus;
import group_b.backend.model.ProviderServiceEntity;
import group_b.backend.model.ServiceProvider;
import group_b.backend.model.User;
import group_b.backend.repository.BookingRepository;
import group_b.backend.repository.ProviderServiceRepository;
import group_b.backend.repository.ProviderWorkingHoursRepository;
import group_b.backend.model.ProviderWorkingHours;
import group_b.backend.repository.ReviewRepository;
import group_b.backend.repository.ServiceProviderRepository;
import group_b.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;

import group_b.backend.exception.ResourceNotFoundException;
import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProviderService {

    private final BookingRepository bookingRepository;
    private final ReviewRepository reviewRepository;
    private final ServiceProviderRepository providerRepository;
    private final UserRepository userRepository;
    private final ProviderServiceRepository serviceRepository;
    private final ProviderWorkingHoursRepository workingHoursRepository;

    public ProviderDashboardDto getDashboardData(@NonNull Long providerId) {
        // This ensures the provider exists before we query anything
        ServiceProvider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceProvider not found with id: " + providerId));

        // --- Stats ---
        var stats = new ProviderDashboardDto.Stats();
        stats.setTodayEarnings(bookingRepository.getTodayEarnings(providerId, LocalDate.now()));
        stats.setUpcomingCount(bookingRepository.countByProviderIdAndStatusAndScheduledDateAfter(providerId,
                BookingStatus.CONFIRMED, LocalDate.now()));
        stats.setPendingRequestsCount(bookingRepository.countByProviderIdAndStatus(providerId, BookingStatus.PENDING));
        Double averageRating = reviewRepository.getAverageRatingByProviderId(providerId);
        stats.setAverageRating(averageRating != null ? BigDecimal.valueOf(averageRating) : BigDecimal.ZERO);

        var dashboardDto = new ProviderDashboardDto();
        dashboardDto.setStats(stats);
        dashboardDto.setCharts(new ProviderDashboardDto.Charts());
        dashboardDto.getCharts().setThisWeekEarnings(calculateThisWeekEarnings(providerId));
        dashboardDto.setLists(new ProviderDashboardDto.Lists());
        dashboardDto.getLists().setNewRequests(
                bookingRepository.findTop5ByProviderAndStatusOrderByScheduledDateAsc(provider, BookingStatus.PENDING)
                        .stream().map(this::toBookingDto).collect(Collectors.toList()));
        dashboardDto.getLists().setUpcomingBookings(
                bookingRepository.findTop5ByProviderAndStatusOrderByScheduledDateAsc(provider, BookingStatus.CONFIRMED)
                        .stream().map(this::toBookingDto).collect(Collectors.toList()));

        return dashboardDto;
    }

    public PaginatedResponseDto<BookingDto> getBookings(@NonNull Long providerId, BookingStatus status,
            LocalDate startDate, LocalDate endDate, Pageable pageable) {
        Page<Booking> bookingsPage;

        // Determine which repository method to call based on provided filters
        if (status != null && startDate != null && endDate != null) {
            bookingsPage = bookingRepository.findByProviderIdAndStatusAndScheduledDateBetween(providerId, status,
                    startDate, endDate, pageable);
        } else if (status != null) {
            bookingsPage = bookingRepository.findByProviderIdAndStatus(providerId, status, pageable);
        } else if (startDate != null && endDate != null) {
            bookingsPage = bookingRepository.findByProviderIdAndScheduledDateBetween(providerId, startDate, endDate,
                    pageable);
        } else {
            bookingsPage = bookingRepository.findByProviderId(providerId, pageable);
        }

        List<BookingDto> bookingDtos = bookingsPage.getContent().stream()
                .map(this::toBookingDtoWithPrivacy) // Apply privacy logic here
                .collect(Collectors.toList());

        return new PaginatedResponseDto<>(
                bookingDtos,
                bookingsPage.getNumber(),
                bookingsPage.getTotalElements(),
                bookingsPage.getTotalPages());
    }

    @Transactional
    public BookingDto updateBookingStatus(@NonNull Long bookingId, BookingStatus newStatus) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        // Add any authorization logic here, e.g., check if the booking belongs to the
        // provider

        booking.setStatus(newStatus);
        Booking updatedBooking = bookingRepository.save(booking);
        return toBookingDto(updatedBooking);
    }

    public ProviderProfileDto getProfileDetails(@NonNull Long providerId) {
        ServiceProvider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceProvider not found with id: " + providerId));
        return mapToProfileDto(provider);
    }

    @Transactional
    public ProviderProfileDto updateProfileDetails(@NonNull Long providerId, ProviderProfileDto profileDto) {
        ServiceProvider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceProvider not found with id: " + providerId));

        User user = provider.getUser();

        // Update User entity fields
        user.setFullName(profileDto.getFullName());
        user.setPhone(profileDto.getPhone());
        user.setAddress(profileDto.getServiceArea()); // Mapping serviceArea DTO field to User address
        user.setPincode(profileDto.getPincode());

        // Update ServiceProvider entity fields
        provider.setBusinessName(profileDto.getBusinessName());
        provider.setCategory(profileDto.getCategory());
        provider.setBioShort(profileDto.getBio());
        provider.setAbout(profileDto.getAbout());
        provider.setProfileImageUrl(profileDto.getProfileImageUrl());
        if (profileDto.getSkills() != null) {
            provider.setSkills(String.join(", ", profileDto.getSkills()));
        }
        if (profileDto.getWorkingHours() != null) {
            updateProviderWorkingHours(provider, profileDto.getWorkingHours());
            workingHoursRepository.saveAll(Objects.requireNonNull(provider.getWorkingHours()));
        }

        // Save both entities
        userRepository.save(user);
        ServiceProvider updatedProvider = providerRepository.save(provider);

        return mapToProfileDto(updatedProvider);
    }

    public List<ProviderServiceDTO> getAllServices(@NonNull Long providerId) {
        return serviceRepository.findByProviderId(providerId).stream()
                .map(this::toServiceDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProviderServiceDTO updateService(@NonNull Long providerId, @NonNull Long serviceId,
            ProviderServiceDTO updatedData) {
        // Find the service by its ID
        ProviderServiceEntity service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));

        // Security Check: Ensure the service belongs to the provider
        if (!service.getProvider().getId().equals(providerId)) {
            throw new SecurityException("Service does not belong to the specified provider.");
        }

        // Update the entity fields from the DTO
        service.setName(updatedData.getName());
        service.setDescription(updatedData.getDescription());
        service.setPrice(updatedData.getPrice());
        service.setDuration(updatedData.getDuration());
        service.setActive(updatedData.isActive());

        ProviderServiceEntity savedService = serviceRepository.save(service);
        return toServiceDTO(savedService);
    }

    @Transactional
    public ProviderServiceDTO createService(@NonNull Long providerId, ProviderServiceDTO serviceDto) {
        ServiceProvider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceProvider not found with id: " + providerId));

        ProviderServiceEntity service = new ProviderServiceEntity();
        service.setProvider(provider);
        service.setName(serviceDto.getName());
        service.setDescription(serviceDto.getDescription());
        service.setPrice(serviceDto.getPrice());
        service.setDuration(serviceDto.getDuration());
        service.setActive(serviceDto.isActive());

        ProviderServiceEntity savedService = serviceRepository.save(service);
        return toServiceDTO(savedService);
    }

    @Transactional
    public void deleteService(@NonNull Long providerId, @NonNull Long serviceId) {
        ProviderServiceEntity service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));

        if (!service.getProvider().getId().equals(providerId)) {
            throw new SecurityException("Service does not belong to the specified provider.");
        }

        serviceRepository.delete(service);
    }

    public EarningsAnalyticsDto getEarningsAnalytics(@NonNull Long providerId, String filter, LocalDate date) {
        LocalDate startDate;
        LocalDate endDate;
        List<EarningsAnalyticsDto.ChartData> chartData = new ArrayList<>();
        BigDecimal totalRevenue = BigDecimal.ZERO;
        long totalBookings = 0;

        if ("week".equalsIgnoreCase(filter)) {
            startDate = date.with(DayOfWeek.MONDAY);
            endDate = date.with(DayOfWeek.SUNDAY);

            // Initialize chart with 0 for all days
            Map<LocalDate, BigDecimal> dailyMap = new LinkedHashMap<>();
            for (LocalDate d = startDate; !d.isAfter(endDate); d = d.plusDays(1)) {
                dailyMap.put(d, BigDecimal.ZERO);
            }

            List<Object[]> results = bookingRepository.findDailyEarnings(providerId, startDate, endDate);
            for (Object[] row : results) {
                dailyMap.put((LocalDate) row[0], (BigDecimal) row[1]);
                totalRevenue = totalRevenue.add((BigDecimal) row[1]);
            }

            dailyMap.forEach((d, amount) -> chartData.add(new EarningsAnalyticsDto.ChartData(
                    d.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.US), amount)));

            totalBookings = bookingRepository.findCompletedBookingsBetween(providerId, startDate, endDate).size();

        } else if ("month".equalsIgnoreCase(filter)) {
            startDate = date.withDayOfMonth(1);
            endDate = date.withDayOfMonth(date.lengthOfMonth());

            Map<Integer, BigDecimal> dailyMap = new LinkedHashMap<>();
            for (int i = 1; i <= date.lengthOfMonth(); i++) {
                dailyMap.put(i, BigDecimal.ZERO);
            }

            List<Object[]> results = bookingRepository.findDailyEarnings(providerId, startDate, endDate);
            for (Object[] row : results) {
                LocalDate d = (LocalDate) row[0];
                dailyMap.put(d.getDayOfMonth(), (BigDecimal) row[1]);
                totalRevenue = totalRevenue.add((BigDecimal) row[1]);
            }

            dailyMap.forEach(
                    (day, amount) -> chartData.add(new EarningsAnalyticsDto.ChartData(String.valueOf(day), amount)));

            totalBookings = bookingRepository.findCompletedBookingsBetween(providerId, startDate, endDate).size();

        } else if ("year".equalsIgnoreCase(filter)) {
            int year = date.getYear();
            Map<Integer, BigDecimal> monthlyMap = new LinkedHashMap<>();
            for (int i = 1; i <= 12; i++) {
                monthlyMap.put(i, BigDecimal.ZERO);
            }

            List<Object[]> results = bookingRepository.findMonthlyEarnings(providerId, year);
            for (Object[] row : results) {
                // Extract month (1-12) and amount
                monthlyMap.put(((Number) row[0]).intValue(), (BigDecimal) row[1]);
                totalRevenue = totalRevenue.add((BigDecimal) row[1]);
            }

            String[] months = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
            monthlyMap.forEach(
                    (month, amount) -> chartData.add(new EarningsAnalyticsDto.ChartData(months[month - 1], amount)));

            totalBookings = bookingRepository
                    .findCompletedBookingsBetween(providerId, LocalDate.of(year, 1, 1), LocalDate.of(year, 12, 31))
                    .size();
        }

        EarningsAnalyticsDto dto = new EarningsAnalyticsDto();
        dto.setTotalRevenue(totalRevenue);
        dto.setTotalCompletedBookings(totalBookings);
        dto.setAveragePerBooking(totalBookings > 0 ? totalRevenue.doubleValue() / totalBookings : 0.0);
        dto.setChartData(chartData);
        return dto;
    }

    private List<Map<String, Object>> calculateThisWeekEarnings(@NonNull Long providerId) {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);

        List<Booking> completedBookings = bookingRepository.findCompletedBookingsBetween(providerId, startOfWeek,
                today);

        Map<DayOfWeek, Double> earningsByDay = completedBookings.stream()
                .collect(Collectors.groupingBy(
                        booking -> booking.getScheduledDate() != null ? booking.getScheduledDate().getDayOfWeek()
                                : null,
                        Collectors.summingDouble(b -> b.getAgreedPrice().doubleValue())));

        return Arrays.stream(DayOfWeek.values()) // This ensures all 7 days are present
                .sorted()
                .map(entry -> {
                    Map<String, Object> dayEarning = new HashMap<>();
                    dayEarning.put("day", entry.getDisplayName(TextStyle.SHORT, Locale.US));
                    dayEarning.put("earnings", earningsByDay.getOrDefault(entry, 0.0));
                    return dayEarning;
                })
                .collect(Collectors.toList());
    }

    // Mapper with Privacy Logic
    private BookingDto toBookingDtoWithPrivacy(Booking booking) {
        BookingDto dto = toBookingDto(booking);
        if (booking.getStatus() == BookingStatus.CANCELLED || booking.getStatus() == BookingStatus.REJECTED) {
            dto.setCustomerContactPhone(null);
            dto.setJobLocationAddress(null);
        }
        return dto;
    }

    // Generic Mapper from Entity to DTO
    private BookingDto toBookingDto(Booking booking) {
        if (booking == null) {
            return null;
        }
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

    private ProviderProfileDto mapToProfileDto(ServiceProvider provider) {
        User user = provider.getUser();
        ProviderProfileDto dto = new ProviderProfileDto();
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setBusinessName(provider.getBusinessName());
        dto.setCategory(provider.getCategory());
        dto.setPincode(user.getPincode());
        dto.setServiceArea(user.getAddress()); // Mapping User address to serviceArea DTO field
        dto.setBio(provider.getBioShort());
        dto.setAbout(provider.getAbout());
        dto.setProfileImageUrl(provider.getProfileImageUrl());

        if (provider.getSkills() != null && !provider.getSkills().isEmpty()) {
            dto.setSkills(Arrays.asList(provider.getSkills().split("\\s*,\\s*")));
        } else {
            dto.setSkills(Collections.emptyList());
        }

        if (provider.getWorkingHours() != null) {
            dto.setWorkingHours(provider.getWorkingHours().stream().map(wh -> {
                WorkingHourDTO whDto = new WorkingHourDTO();
                whDto.setDay(wh.getDayOfWeek().name());
                whDto.setOpen(wh.getOpenTime());
                whDto.setClose(wh.getCloseTime());
                whDto.setClosed(wh.isClosed());
                return whDto;
            }).collect(Collectors.toList()));
        }
        return dto;
    }

    private ProviderServiceDTO toServiceDTO(ProviderServiceEntity entity) {
        ProviderServiceDTO dto = new ProviderServiceDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setPrice(entity.getPrice());
        dto.setDuration(entity.getDuration());
        dto.setActive(entity.isActive());
        dto.setRating(entity.getRating()); // Map service-specific rating
        dto.setReviewCount(entity.getReviewCount()); // Map service-specific review count
        return dto;
    }

    private void updateProviderWorkingHours(ServiceProvider provider, List<WorkingHourDTO> dtos) {
        List<ProviderWorkingHours> existing = provider.getWorkingHours();
        if (existing == null) {
            existing = new ArrayList<>();
            provider.setWorkingHours(existing);
        }

        // Map existing entities by day for easy lookup
        Map<String, ProviderWorkingHours> existingMap = existing.stream()
                .collect(Collectors.toMap(
                        wh -> wh.getDayOfWeek().name(),
                        Function.identity(),
                        (existingValue, newValue) -> existingValue));

        for (WorkingHourDTO dto : dtos) {
            String dayKey = dto.getDay().toUpperCase();
            ProviderWorkingHours entity = existingMap.get(dayKey);
            if (entity == null) {
                entity = new ProviderWorkingHours();
                entity.setProvider(provider);
                entity.setDayOfWeek(DayOfWeek.valueOf(dayKey));
                existing.add(entity);
            }
            entity.setOpenTime(dto.getOpen());
            entity.setCloseTime(dto.getClose());
            entity.setClosed(dto.isClosed());
        }
    }

    public Long getProviderIdByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return providerRepository.findByUser(user)
                .map(ServiceProvider::getId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider profile not found for user: " + email));
    }
}