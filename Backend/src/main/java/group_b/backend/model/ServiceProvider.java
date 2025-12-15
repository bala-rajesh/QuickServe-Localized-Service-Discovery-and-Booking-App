package group_b.backend.model;

import jakarta.persistence.*;
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

    private String pincode;

    @Column(name = "about_text")
    private String about;

    @OneToMany(mappedBy = "provider")
    private List<ProviderServiceEntity> services;

    @OneToMany(mappedBy = "provider")
    private List<ProviderWorkingHours> workingHours;

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

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
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
}