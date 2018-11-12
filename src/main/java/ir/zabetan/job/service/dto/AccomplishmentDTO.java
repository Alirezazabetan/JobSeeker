package ir.zabetan.job.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Accomplishment entity.
 */
public class AccomplishmentDTO implements Serializable {

    private String id;

    private String publication;

    private String certification;

    private String patent;

    private String course;

    private String project;

    private String honorAndReward;

    private String testScore;

    private String language;

    private String organization;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPublication() {
        return publication;
    }

    public void setPublication(String publication) {
        this.publication = publication;
    }

    public String getCertification() {
        return certification;
    }

    public void setCertification(String certification) {
        this.certification = certification;
    }

    public String getPatent() {
        return patent;
    }

    public void setPatent(String patent) {
        this.patent = patent;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getHonorAndReward() {
        return honorAndReward;
    }

    public void setHonorAndReward(String honorAndReward) {
        this.honorAndReward = honorAndReward;
    }

    public String getTestScore() {
        return testScore;
    }

    public void setTestScore(String testScore) {
        this.testScore = testScore;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AccomplishmentDTO accomplishmentDTO = (AccomplishmentDTO) o;
        if (accomplishmentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accomplishmentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccomplishmentDTO{" +
            "id=" + getId() +
            ", publication='" + getPublication() + "'" +
            ", certification='" + getCertification() + "'" +
            ", patent='" + getPatent() + "'" +
            ", course='" + getCourse() + "'" +
            ", project='" + getProject() + "'" +
            ", honorAndReward='" + getHonorAndReward() + "'" +
            ", testScore='" + getTestScore() + "'" +
            ", language='" + getLanguage() + "'" +
            ", organization='" + getOrganization() + "'" +
            "}";
    }
}
