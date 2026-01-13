package group_b.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceSearchResponseDto {
    private List<ServiceSearchResultDto> services;
    private String pincodeUsed;
}