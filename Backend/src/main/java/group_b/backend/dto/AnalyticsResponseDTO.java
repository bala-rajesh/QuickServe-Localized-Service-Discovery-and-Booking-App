package group_b.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class AnalyticsResponseDTO {
    private Summary summary;
    private List<ChartDataItem> chartData;

    @Data
    public static class Summary {
        private BigDecimal totalRevenue;
        private long completedBookings;
        private BigDecimal avgBookingValue;
        private String peakPeriod;
    }

    @Data
    @AllArgsConstructor
    public static class ChartDataItem {
        private String label;
        private BigDecimal value;
    }
}