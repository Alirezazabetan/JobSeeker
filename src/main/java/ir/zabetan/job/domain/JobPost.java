package ir.zabetan.job.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A JobPost.
 */
@Document(collection = "job_post")
public class JobPost implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("title")
    private String title;

    @Field("company")
    private String company;

    @Field("start_date")
    private Instant startDate;

    @Field("end_date")
    private Instant endDate;

    @Field("short_description")
    private String shortDescription;

    @Field("application_url")
    private String applicationUrl;

    @Field("location")
    private String location;

    @Field("workinghours")
    private Integer workinghours;

    @Field("job_type")
    private String jobType;

    @Field("requered_skills")
    private String requeredSkills;

    @Field("cover_image")
    private String coverImage;

    @Field("description")
    private String description;

    @Field("min_salary")
    private Long minSalary;

    @Field("max_salary")
    private Long maxSalary;

    @Field("year_experience")
    private Integer yearExperience;

    @Field("certificate_needed")
    private String certificateNeeded;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public JobPost title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public JobPost company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public JobPost startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public JobPost endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public JobPost shortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
        return this;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getApplicationUrl() {
        return applicationUrl;
    }

    public JobPost applicationUrl(String applicationUrl) {
        this.applicationUrl = applicationUrl;
        return this;
    }

    public void setApplicationUrl(String applicationUrl) {
        this.applicationUrl = applicationUrl;
    }

    public String getLocation() {
        return location;
    }

    public JobPost location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getWorkinghours() {
        return workinghours;
    }

    public JobPost workinghours(Integer workinghours) {
        this.workinghours = workinghours;
        return this;
    }

    public void setWorkinghours(Integer workinghours) {
        this.workinghours = workinghours;
    }

    public String getJobType() {
        return jobType;
    }

    public JobPost jobType(String jobType) {
        this.jobType = jobType;
        return this;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getRequeredSkills() {
        return requeredSkills;
    }

    public JobPost requeredSkills(String requeredSkills) {
        this.requeredSkills = requeredSkills;
        return this;
    }

    public void setRequeredSkills(String requeredSkills) {
        this.requeredSkills = requeredSkills;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public JobPost coverImage(String coverImage) {
        this.coverImage = coverImage;
        return this;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public String getDescription() {
        return description;
    }

    public JobPost description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getMinSalary() {
        return minSalary;
    }

    public JobPost minSalary(Long minSalary) {
        this.minSalary = minSalary;
        return this;
    }

    public void setMinSalary(Long minSalary) {
        this.minSalary = minSalary;
    }

    public Long getMaxSalary() {
        return maxSalary;
    }

    public JobPost maxSalary(Long maxSalary) {
        this.maxSalary = maxSalary;
        return this;
    }

    public void setMaxSalary(Long maxSalary) {
        this.maxSalary = maxSalary;
    }

    public Integer getYearExperience() {
        return yearExperience;
    }

    public JobPost yearExperience(Integer yearExperience) {
        this.yearExperience = yearExperience;
        return this;
    }

    public void setYearExperience(Integer yearExperience) {
        this.yearExperience = yearExperience;
    }

    public String getCertificateNeeded() {
        return certificateNeeded;
    }

    public JobPost certificateNeeded(String certificateNeeded) {
        this.certificateNeeded = certificateNeeded;
        return this;
    }

    public void setCertificateNeeded(String certificateNeeded) {
        this.certificateNeeded = certificateNeeded;
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
        JobPost jobPost = (JobPost) o;
        if (jobPost.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jobPost.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JobPost{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", company='" + getCompany() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", shortDescription='" + getShortDescription() + "'" +
            ", applicationUrl='" + getApplicationUrl() + "'" +
            ", location='" + getLocation() + "'" +
            ", workinghours=" + getWorkinghours() +
            ", jobType='" + getJobType() + "'" +
            ", requeredSkills='" + getRequeredSkills() + "'" +
            ", coverImage='" + getCoverImage() + "'" +
            ", description='" + getDescription() + "'" +
            ", minSalary=" + getMinSalary() +
            ", maxSalary=" + getMaxSalary() +
            ", yearExperience=" + getYearExperience() +
            ", certificateNeeded='" + getCertificateNeeded() + "'" +
            "}";
    }
}
