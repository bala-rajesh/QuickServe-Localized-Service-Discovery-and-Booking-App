package group_b.backend.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class EarningsAnalyticsDto {
    private BigDecimal totalRevenue;
    private double averagePerBooking;
    private long totalCompletedBookings;
    private List<ChartData> chartData;

    @Data
    public static class ChartData {
        private String label;
        private BigDecimal earnings;

        public ChartData(String label, BigDecimal earnings) {
            this.label = label;
            this.earnings = earnings;
        }
    }
}