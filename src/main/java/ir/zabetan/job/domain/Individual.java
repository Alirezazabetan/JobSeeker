package ir.zabetan.job.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Individual.
 */
@Document(collection = "individual")
public class Individual implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("first_name")
    private String firstName;

    @Field("last_name")
    private String lastName;

    @Field("middle_name")
    private String middleName;

    @Field("phone_number")
    private String phoneNumber;

    @Field("mobile_number")
    private String mobileNumber;

    @Field("birth_date")
    private Instant birthDate;

    @Field("address")
    private String address;

    @Field("job_title")
    private String jobTitle;

    @Field("short_description")
    private String shortDescription;

    @Field("web_site")
    private String webSite;

    @Field("social_ur_ls")
    private String socialURLs;

    @Field("skills")
    private String skills;

    @Field("educations")
    private String educations;

    @Field("work_expriences")
    private String workExpriences;

    @Field("accomplishment")
    private String accomplishment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Individual firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Individual lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public Individual middleName(String middleName) {
        this.middleName = middleName;
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Individual phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public Individual mobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
        return this;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public Instant getBirthDate() {
        return birthDate;
    }

    public Individual birthDate(Instant birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(Instant birthDate) {
        this.birthDate = birthDate;
    }

    public String getAddress() {
        return address;
    }

    public Individual address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public Individual jobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
        return this;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public Individual shortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
        return this;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getWebSite() {
        return webSite;
    }

    public Individual webSite(String webSite) {
        this.webSite = webSite;
        return this;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
    }

    public String getSocialURLs() {
        return socialURLs;
    }

    public Individual socialURLs(String socialURLs) {
        this.socialURLs = socialURLs;
        return this;
    }

    public void setSocialURLs(String socialURLs) {
        this.socialURLs = socialURLs;
    }

    public String getSkills() {
        return skills;
    }

    public Individual skills(String skills) {
        this.skills = skills;
        return this;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getEducations() {
        return educations;
    }

    public Individual educations(String educations) {
        this.educations = educations;
        return this;
    }

    public void setEducations(String educations) {
        this.educations = educations;
    }

    public String getWorkExpriences() {
        return workExpriences;
    }

    public Individual workExpriences(String workExpriences) {
        this.workExpriences = workExpriences;
        return this;
    }

    public void setWorkExpriences(String workExpriences) {
        this.workExpriences = workExpriences;
    }

    public String getAccomplishment() {
        return accomplishment;
    }

    public Individual accomplishment(String accomplishment) {
        this.accomplishment = accomplishment;
        return this;
    }

    public void setAccomplishment(String accomplishment) {
        this.accomplishment = accomplishment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Individual individual = (Individual) o;
        if (individual.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), individual.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Individual{" +
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
