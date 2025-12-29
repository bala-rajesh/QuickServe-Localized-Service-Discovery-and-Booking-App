package group_b.backend.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
public class ProviderDashboardDto {
    private Stats stats;
    private Charts charts;
    private Lists lists;

    @Data
    public static class Stats {
        private BigDecimal todayEarnings;
        private long upcomingCount;
        private long pendingRequestsCount;
        private BigDecimal averageRating;
    }

    @Data
    public static class Charts {
        private List<Map<String, Object>> thisWeekEarnings; // e.g., [{"day": "MON", "amount": 150.00}]
    }

    @Data
    public static class Lists {
        private List<BookingDto> newRequests;
        private List<BookingDto> upcomingBookings;
    }
}