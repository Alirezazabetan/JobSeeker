package ir.zabetan.job.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the JobPost entity.
 */
public class JobPostDTO implements Serializable {

    private String id;

    private String title;

    private String company;

    private Instant startDate;

    private Instant endDate;

    private String shortDescription;

    private String applicationUrl;

    private String location;

    private Integer workinghours;

    private String jobType;

    private String requeredSkills;

    private String coverImage;

    private String description;

    private Long minSalary;

    private Long maxSalary;

    private Integer yearExperience;

    private String certificateNeeded;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getApplicationUrl() {
        return applicationUrl;
    }

    public void setApplicationUrl(String applicationUrl) {
        this.applicationUrl = applicationUrl;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getWorkinghours() {
        return workinghours;
    }

    public void setWorkinghours(Integer workinghours) {
        this.workinghours = workinghours;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getRequeredSkills() {
        return requeredSkills;
    }

    public void setRequeredSkills(String requeredSkills) {
        this.requeredSkills = requeredSkills;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getMinSalary() {
        return minSalary;
    }

    public void setMinSalary(Long minSalary) {
        this.minSalary = minSalary;
    }

    public Long getMaxSalary() {
        return maxSalary;
    }

    public void setMaxSalary(Long maxSalary) {
        this.maxSalary = maxSalary;
    }

    public Integer getYearExperience() {
        return yearExperience;
    }

    public void setYearExperience(Integer yearExperience) {
        this.yearExperience = yearExperience;
    }

    public String getCertificateNeeded() {
        return certificateNeeded;
    }

    public void setCertificateNeeded(String certificateNeeded) {
        this.certificateNeeded = certificateNeeded;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        JobPostDTO jobPostDTO = (JobPostDTO) o;
        if (jobPostDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jobPostDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JobPostDTO{" +
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
