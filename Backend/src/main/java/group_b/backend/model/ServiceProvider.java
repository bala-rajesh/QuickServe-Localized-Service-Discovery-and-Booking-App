package group_b.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "service_providers")
public class ServiceProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "provider_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @Column(name = "business_name")
    private String businessName;

    @Column(name = "bio_short")
    private String bioShort;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    private String category;

    @Column(name = "about_text")
    private String about;

    @OneToMany(mappedBy = "provider")
    private List<ProviderServiceEntity> services;

    @OneToMany(mappedBy = "provider")
    private List<ProviderWorkingHours> workingHours;

    @Column(name = "rating")
    private BigDecimal rating;

    @Column(name = "experience")
    private String experience;

    @Column(name = "completed_jobs")
    private Integer completedJobs;

    @Column(name = "skills", columnDefinition = "TEXT")
    private String skills;

    // ADDED: Location coordinates for map integration
    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getBioShort() {
        return bioShort;
    }

    public void setBioShort(String bioShort) {
        this.bioShort = bioShort;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<ProviderServiceEntity> getServices() {
        return services;
    }

    public void setServices(List<ProviderServiceEntity> services) {
        this.services = services;
    }

    public List<ProviderWorkingHours> getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(List<ProviderWorkingHours> workingHours) {
        this.workingHours = workingHours;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public Integer getCompletedJobs() {
        return completedJobs;
    }

    public void setCompletedJobs(Integer completedJobs) {
        this.completedJobs = completedJobs;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    // ADDED: Getters and setters for location coordinates
    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}