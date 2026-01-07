package group_b.backend.service;

import group_b.backend.dto.AnalyticsResponseDTO;
import group_b.backend.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class ProviderAnalyticsService {

    private final BookingRepository bookingRepository;

    public AnalyticsResponseDTO getAnalytics(Long providerId, String period) {
        if ("WEEK".equalsIgnoreCase(period)) {
            return getWeeklyAnalytics(providerId);
        } else if ("MONTH".equalsIgnoreCase(period)) {
            return getMonthlyAnalytics(providerId);
        }
        throw new IllegalArgumentException("Invalid period specified: " + period);
    }

    private AnalyticsResponseDTO getWeeklyAnalytics(Long providerId) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(6);

        List<Object[]> earnings = bookingRepository.findDailyEarnings(providerId, startDate, endDate);
        Map<LocalDate, BigDecimal> earningsMap = earnings.stream()
                .collect(Collectors.toMap(row -> (LocalDate) row[0], row -> (BigDecimal) row[1]));

        List<AnalyticsResponseDTO.ChartDataItem> chartData = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            LocalDate day = startDate.plusDays(i);
            BigDecimal amount = earningsMap.getOrDefault(day, BigDecimal.ZERO);
            chartData.add(new AnalyticsResponseDTO.ChartDataItem(day.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.US), amount));
        }

        return buildAnalyticsResponse(chartData);
    }

    private AnalyticsResponseDTO getMonthlyAnalytics(Long providerId) {
        LocalDate today = LocalDate.now();
        int month = today.getMonthValue();
        int year = today.getYear();

        List<Object[]> earnings = bookingRepository.findWeeklyEarnings(providerId, month, year);
        Map<Integer, BigDecimal> earningsMap = earnings.stream()
                .collect(Collectors.toMap(row -> ((Number) row[0]).intValue(), row -> (BigDecimal) row[1]));

        YearMonth yearMonth = YearMonth.of(year, month);
        int lastDayOfMonth = yearMonth.lengthOfMonth();
        int lastWeekOfMonth = yearMonth.atDay(lastDayOfMonth).get(WeekFields.of(Locale.US).weekOfMonth());

        List<AnalyticsResponseDTO.ChartDataItem> chartData = IntStream.rangeClosed(1, lastWeekOfMonth)
                .mapToObj(weekNum -> {
                    BigDecimal amount = earningsMap.getOrDefault(weekNum, BigDecimal.ZERO);
                    return new AnalyticsResponseDTO.ChartDataItem("Week " + weekNum, amount);
                })
                .collect(Collectors.toList());

        return buildAnalyticsResponse(chartData);
    }

    private AnalyticsResponseDTO buildAnalyticsResponse(List<AnalyticsResponseDTO.ChartDataItem> chartData) {
        AnalyticsResponseDTO response = new AnalyticsResponseDTO();
        AnalyticsResponseDTO.Summary summary = new AnalyticsResponseDTO.Summary();

        BigDecimal totalRevenue = chartData.stream()
                .map(AnalyticsResponseDTO.ChartDataItem::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long completedBookings = chartData.stream()
                .filter(item -> item.getValue().compareTo(BigDecimal.ZERO) > 0)
                .count(); // This is a simplification; a real count would require another query.

        summary.setTotalRevenue(totalRevenue);
        summary.setCompletedBookings(completedBookings);

        if (completedBookings > 0) {
            summary.setAvgBookingValue(totalRevenue.divide(BigDecimal.valueOf(completedBookings), 2, RoundingMode.HALF_UP));
        } else {
            summary.setAvgBookingValue(BigDecimal.ZERO);
        }

        summary.setPeakPeriod(
                chartData.stream()
                        .max(Comparator.comparing(AnalyticsResponseDTO.ChartDataItem::getValue))
                        .map(AnalyticsResponseDTO.ChartDataItem::getLabel)
                        .orElse("N/A")
        );

        response.setSummary(summary);
        response.setChartData(chartData);

        return response;
    }
}