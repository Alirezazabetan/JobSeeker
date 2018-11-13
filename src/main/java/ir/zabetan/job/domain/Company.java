package ir.zabetan.job.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Company.
 */
@Document(collection = "company")
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("work_title")
    private String workTitle;

    @Field("work_description")
    private String workDescription;

    @Field("location")
    private String location;

    @Field("start_date")
    private Instant startDate;

    @Field("website")
    private String website;

    @Field("tel")
    private Long tel;

    @Field("employer_range")
    private String employerRange;

    @Field("email")
    private String email;

    @Field("about")
    private String about;

    @Field("social_networks")
    private String socialNetworks;

    @Field("vacancies")
    private String vacancies;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Company name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWorkTitle() {
        return workTitle;
    }

    public Company workTitle(String workTitle) {
        this.workTitle = workTitle;
        return this;
    }

    public void setWorkTitle(String workTitle) {
        this.workTitle = workTitle;
    }

    public String getWorkDescription() {
        return workDescription;
    }

    public Company workDescription(String workDescription) {
        this.workDescription = workDescription;
        return this;
    }

    public void setWorkDescription(String workDescription) {
        this.workDescription = workDescription;
    }

    public String getLocation() {
        return location;
    }

    public Company location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Company startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public String getWebsite() {
        return website;
    }

    public Company website(String website) {
        this.website = website;
        return this;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Long getTel() {
        return tel;
    }

    public Company tel(Long tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(Long tel) {
        this.tel = tel;
    }

    public String getEmployerRange() {
        return employerRange;
    }

    public Company employerRange(String employerRange) {
        this.employerRange = employerRange;
        return this;
    }

    public void setEmployerRange(String employerRange) {
        this.employerRange = employerRange;
    }

    public String getEmail() {
        return email;
    }

    public Company email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAbout() {
        return about;
    }

    public Company about(String about) {
        this.about = about;
        return this;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getSocialNetworks() {
        return socialNetworks;
    }

    public Company socialNetworks(String socialNetworks) {
        this.socialNetworks = socialNetworks;
        return this;
    }

    public void setSocialNetworks(String socialNetworks) {
        this.socialNetworks = socialNetworks;
    }

    public String getVacancies() {
        return vacancies;
    }

    public Company vacancies(String vacancies) {
        this.vacancies = vacancies;
        return this;
    }

    public void setVacancies(String vacancies) {
        this.vacancies = vacancies;
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
        Company company = (Company) o;
        if (company.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), company.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", workTitle='" + getWorkTitle() + "'" +
            ", workDescription='" + getWorkDescription() + "'" +
            ", location='" + getLocation() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", website='" + getWebsite() + "'" +
            ", tel=" + getTel() +
            ", employerRange='" + getEmployerRange() + "'" +
            ", email='" + getEmail() + "'" +
            ", about='" + getAbout() + "'" +
            ", socialNetworks='" + getSocialNetworks() + "'" +
            ", vacancies='" + getVacancies() + "'" +
            "}";
    }
}
