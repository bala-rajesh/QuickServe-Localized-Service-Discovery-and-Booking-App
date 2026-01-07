package group_b.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProviderSettingsDTO {
    private List<ProviderServiceDTO> services;
    private List<WorkingHourDTO> workingHours;
}