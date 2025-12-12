package group_b.backend.repository;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface EarningsData {
    interface Daily {
        LocalDate getDate();
        BigDecimal getAmount();
    }
    interface Weekly {
        Integer getWeek();
        BigDecimal getAmount();
    }
}