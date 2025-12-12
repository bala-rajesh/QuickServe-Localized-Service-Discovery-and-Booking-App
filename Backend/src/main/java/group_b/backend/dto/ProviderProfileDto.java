package group_b.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProviderProfileDto {
    private String fullName;
    private String email;
    private String phone;
    private String businessName;
    private String category;
    private String pincode;
    private String serviceArea;
    private String bio;
    private String about;
    private String profileImageUrl;
    private List<WorkingHourDTO> workingHours;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
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

    public String getServiceArea() {
        return serviceArea;
    }

    public void setServiceArea(String serviceArea) {
        this.serviceArea = serviceArea;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public List<WorkingHourDTO> getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(List<WorkingHourDTO> workingHours) {
        this.workingHours = workingHours;
    }
}