package ir.zabetan.job.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Individual entity.
 */
public class IndividualDTO implements Serializable {

    private String id;

    private String firstName;

    private String lastName;

    private String middleName;

    private String phoneNumber;

    private String mobileNumber;

    private Instant birthDate;

    private String address;

    private String jobTitle;

    private String shortDescription;

    private String webSite;

    private String socialURLs;

    private String skills;

    private String educations;

    private String workExpriences;

    private String accomplishment;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public Instant getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Instant birthDate) {
        this.birthDate = birthDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getWebSite() {
        return webSite;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
    }

    public String getSocialURLs() {
        return socialURLs;
    }

    public void setSocialURLs(String socialURLs) {
        this.socialURLs = socialURLs;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getEducations() {
        return educations;
    }

    public void setEducations(String educations) {
        this.educations = educations;
    }

    public String getWorkExpriences() {
        return workExpriences;
    }

    public void setWorkExpriences(String workExpriences) {
        this.workExpriences = workExpriences;
    }

    public String getAccomplishment() {
        return accomplishment;
    }

    public void setAccomplishment(String accomplishment) {
        this.accomplishment = accomplishment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        IndividualDTO individualDTO = (IndividualDTO) o;
        if (individualDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), individualDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IndividualDTO{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", mobileNumber='" + getMobileNumber() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", address='" + getAddress() + "'" +
            ", jobTitle='" + getJobTitle() + "'" +
            ", shortDescription='" + getShortDescription() + "'" +
            ", webSite='" + getWebSite() + "'" +
            ", socialURLs='" + getSocialURLs() + "'" +
            ", skills='" + getSkills() + "'" +
            ", educations='" + getEducations() + "'" +
            ", workExpriences='" + getWorkExpriences() + "'" +
            ", accomplishment='" + getAccomplishment() + "'" +
            "}";
    }
}
