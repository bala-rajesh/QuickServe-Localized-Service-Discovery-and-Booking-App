package com.quickserve.backend.controller;

import com.quickserve.backend.model.Service;
import com.quickserve.backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
@SuppressWarnings("null")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    @GetMapping("/{id}")
    public Service getServiceById(@PathVariable String id) {
        return serviceRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Service createService(@RequestBody Service service) {
        return serviceRepository.save(service);
    }

    @GetMapping("/category/{category}")
    public List<Service> getServicesByCategory(@PathVariable String category) {
        return serviceRepository.findByCategory(category);
    }

    @GetMapping("/provider/{providerId}")
    public List<Service> getServicesByProvider(@PathVariable String providerId) {
        return serviceRepository.findByProviderId(providerId);
    }

    @PutMapping("/{id}")
    public Service updateService(@PathVariable String id, @RequestBody Service serviceDetails) {
        return serviceRepository.findById(id).map(service -> {
            service.setName(serviceDetails.getName());
            service.setDescription(serviceDetails.getDescription());
            service.setPrice(serviceDetails.getPrice());
            service.setCategory(serviceDetails.getCategory());
            service.setDuration(serviceDetails.getDuration());
            return serviceRepository.save(service);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable String id) {
        serviceRepository.deleteById(id);
    }
}
