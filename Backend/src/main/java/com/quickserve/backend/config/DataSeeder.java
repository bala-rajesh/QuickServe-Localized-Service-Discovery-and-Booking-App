package com.quickserve.backend.config;

import com.quickserve.backend.model.Service;
import com.quickserve.backend.repository.ServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder implements CommandLineRunner {

    private final ServiceRepository serviceRepository;

    public DataSeeder(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (serviceRepository.count() == 0) {
            seedServices();
        }
    }

    @SuppressWarnings("null")
    private void seedServices() {
        Service s1 = new Service();
        s1.setProviderName("Sarah Jenkins");
        s1.setTitle("Master Plumber");
        s1.setCategory("Home");
        s1.setRating(4.9);
        s1.setReviewCount(124);
        s1.setDescription("Fast, reliable, and affordable plumbing services for your home or business.");
        s1.setPrice(50.0);
        s1.setDuration("1 hour");
        s1.setLocation("Krishnan Koil");
        // Near Kalasalingam University
        s1.setLatitude(9.5850);
        s1.setLongitude(77.6830);

        Service s2 = new Service();
        s2.setProviderName("Mike's Plumbing Co.");
        s2.setTitle("Commercial & Residential");
        s2.setCategory("Home");
        s2.setRating(4.8);
        s2.setReviewCount(88);
        s2.setDescription("24/7 emergency services available. Licensed and insured for your peace of mind.");
        s2.setPrice(65.0);
        s2.setDuration("1 hour");
        s2.setLocation("Srivilliputhur");
        s2.setLatitude(9.5860);
        s2.setLongitude(77.6840);

        Service s3 = new Service();
        s3.setProviderName("AquaFlow Experts");
        s3.setTitle("Eco-Friendly Solutions");
        s3.setCategory("Home");
        s3.setRating(4.7);
        s3.setReviewCount(45);
        s3.setDescription("Specializing in water heaters and green plumbing solutions.");
        s3.setPrice(55.0);
        s3.setDuration("1.5 hours");
        s3.setLocation("Rajapalayam");
        s3.setLatitude(9.5840);
        s3.setLongitude(77.6820);

        Service s4 = new Service();
        s4.setProviderName("Green Keepers");
        s4.setTitle("Expert Gardening");
        s4.setCategory("Outdoors");
        s4.setRating(4.6);
        s4.setReviewCount(30);
        s4.setDescription("Complete garden maintenance and landscaping.");
        s4.setPrice(40.0);
        s4.setDuration("2 hours");
        s4.setLocation("Kalasalingam University");
        s4.setLatitude(9.5870);
        s4.setLongitude(77.6850);

        serviceRepository.saveAll(List.of(s1, s2, s3, s4));
        System.out.println("Dummy services seeded successfully.");
    }
}
