package group_b.backend.repository;

import group_b.backend.model.Booking;
import group_b.backend.model.BookingStatus;
import group_b.backend.model.ServiceProvider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT COALESCE(SUM(b.agreedPrice), 0) FROM Booking b WHERE b.provider.id = :providerId AND b.status = 'COMPLETED' AND b.scheduledDate = :date")
    BigDecimal getTodayEarnings(@Param("providerId") Long providerId, @Param("date") LocalDate date);

    long countByProviderIdAndStatusAndScheduledDateAfter(Long providerId, BookingStatus status, LocalDate date);

    long countByProviderIdAndStatus(Long providerId, BookingStatus status);

    List<Booking> findTop5ByProviderAndStatusOrderByScheduledDateAsc(ServiceProvider provider, BookingStatus status);

    @Query("SELECT b FROM Booking b WHERE b.provider.id = :providerId AND b.status = 'COMPLETED' AND b.scheduledDate BETWEEN :startDate AND :endDate")
    List<Booking> findCompletedBookingsBetween(@Param("providerId") Long providerId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT b.scheduledDate as date, SUM(b.agreedPrice) as amount FROM Booking b WHERE b.provider.id = :providerId AND b.status = 'COMPLETED' AND b.scheduledDate BETWEEN :startDate AND :endDate GROUP BY b.scheduledDate")
    List<Object[]> findDailyEarnings(@Param("providerId") Long providerId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query(value = "SELECT EXTRACT(WEEK FROM scheduled_date) as week, SUM(agreed_price) as amount FROM bookings WHERE provider_id = :providerId AND status = 'COMPLETED' AND EXTRACT(MONTH FROM scheduled_date) = :month AND EXTRACT(YEAR FROM scheduled_date) = :year GROUP BY week ORDER BY week", nativeQuery = true)
    List<Object[]> findWeeklyEarnings(@Param("providerId") Long providerId, @Param("month") int month, @Param("year") int year);

    @Query(value = "SELECT EXTRACT(MONTH FROM scheduled_date) as month, SUM(agreed_price) as amount FROM bookings WHERE provider_id = :providerId AND status = 'COMPLETED' AND EXTRACT(YEAR FROM scheduled_date) = :year GROUP BY month ORDER BY month", nativeQuery = true)
    List<Object[]> findMonthlyEarnings(@Param("providerId") Long providerId, @Param("year") int year);

    Page<Booking> findByProviderIdAndStatusAndScheduledDateBetween(Long providerId, BookingStatus status, LocalDate startDate, LocalDate endDate, Pageable pageable);
    Page<Booking> findByProviderIdAndScheduledDateBetween(Long providerId, LocalDate startDate, LocalDate endDate, Pageable pageable);
    Page<Booking> findByProviderIdAndStatus(Long providerId, BookingStatus status, Pageable pageable);
    Page<Booking> findByProviderId(Long providerId, Pageable pageable);
}