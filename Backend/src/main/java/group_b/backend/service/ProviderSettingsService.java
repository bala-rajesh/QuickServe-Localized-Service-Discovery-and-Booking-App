package group_b.backend.service;

import group_b.backend.dto.ProviderServiceDTO;
import group_b.backend.dto.ProviderSettingsDTO;
import group_b.backend.dto.WorkingHourDTO;
import group_b.backend.exception.ResourceNotFoundException;
import group_b.backend.model.ProviderServiceEntity;
import group_b.backend.model.ProviderWorkingHours;
import group_b.backend.model.ServiceProvider;
import group_b.backend.repository.ProviderServiceRepository;
import group_b.backend.repository.ProviderWorkingHoursRepository;
import group_b.backend.repository.ServiceProviderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ProviderSettingsService {

    private final ServiceProviderRepository providerRepository;
    private final ProviderServiceRepository serviceRepository;
    private final ProviderWorkingHoursRepository workingHoursRepository;

    @Transactional
    public ProviderSettingsDTO getServicesAndSchedule(@NonNull Long providerId) {
        ServiceProvider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceProvider not found with id: " + providerId));

        List<ProviderServiceEntity> services = serviceRepository.findByProviderId(providerId);
        List<ProviderWorkingHours> workingHours = workingHoursRepository.findByProviderId(providerId);

        // If working hours don't exist, create and save a default schedule
        if (workingHours.isEmpty()) {
            workingHours = createDefaultWorkingHours(provider);
        }

        ProviderSettingsDTO settingsDTO = new ProviderSettingsDTO();
        settingsDTO.setServices(services.stream().map(this::toServiceDTO).collect(Collectors.toList()));
        settingsDTO.setWorkingHours(workingHours.stream().map(this::toWorkingHourDTO).collect(Collectors.toList()));

        return settingsDTO;
    }

    @Transactional
    public ProviderServiceDTO addService(@NonNull Long providerId, ProviderServiceDTO serviceDto) {
        ServiceProvider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceProvider not found with id: " + providerId));

        ProviderServiceEntity newService = new ProviderServiceEntity();
        newService.setDuration(serviceDto.getDuration());
        newService.setProvider(provider);
        newService.setName(serviceDto.getName());
        newService.setDescription(serviceDto.getDescription());
        newService.setPrice(serviceDto.getPrice());
        newService.setActive(true); // Default to active

        ProviderServiceEntity savedService = serviceRepository.save(newService);
        return toServiceDTO(savedService);
    }

    @Transactional
    public ProviderServiceDTO updateService(@NonNull Long providerId, @NonNull Long serviceId, ProviderServiceDTO updatedData) {
        ProviderServiceEntity service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));

        if (!service.getProvider().getId().equals(providerId)) {
            throw new SecurityException("Service does not belong to the specified provider.");
        }

        service.setName(updatedData.getName());
        service.setDescription(updatedData.getDescription());
        service.setPrice(updatedData.getPrice());
        service.setDuration(updatedData.getDuration());
        service.setActive(updatedData.isActive());

        ProviderServiceEntity savedService = serviceRepository.save(service);
        return toServiceDTO(savedService);
    }

    @Transactional
    public void updateSchedule(@NonNull Long providerId, List<WorkingHourDTO> schedule) {
        Map<String, ProviderWorkingHours> existingHoursMap = workingHoursRepository.findByProviderId(providerId)
                .stream()
                .collect(Collectors.toMap(wh -> wh.getDayOfWeek().name(), Function.identity()));

        for (WorkingHourDTO dayDto : schedule) {
            ProviderWorkingHours dayEntity = existingHoursMap.get(dayDto.getDay().toUpperCase());
            if (dayEntity != null) {
                dayEntity.setOpenTime(dayDto.getOpen());
                dayEntity.setCloseTime(dayDto.getClose());
                dayEntity.setClosed(dayDto.isClosed());
            }
        }

        workingHoursRepository.saveAll(Objects.requireNonNull(existingHoursMap.values()));
    }

    private List<ProviderWorkingHours> createDefaultWorkingHours(ServiceProvider provider) {
        List<ProviderWorkingHours> defaultHours = new ArrayList<>();
        Stream.of(DayOfWeek.values()).forEach(day -> {
            ProviderWorkingHours hours = new ProviderWorkingHours();
            hours.setProvider(provider);
            hours.setDayOfWeek(day);
            if (day == DayOfWeek.SUNDAY) {
                hours.setClosed(true);
            } else {
                hours.setClosed(false);
                hours.setOpenTime(LocalTime.of(9, 0));
                hours.setCloseTime(LocalTime.of(17, 0));
            }
            defaultHours.add(hours);
        });
        return workingHoursRepository.saveAll(defaultHours);
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

    private WorkingHourDTO toWorkingHourDTO(ProviderWorkingHours entity) {
        WorkingHourDTO dto = new WorkingHourDTO();
        dto.setDay(entity.getDayOfWeek().name());
        dto.setOpen(entity.getOpenTime());
        dto.setClose(entity.getCloseTime());
        dto.setClosed(entity.isClosed());
        return dto;
    }
}