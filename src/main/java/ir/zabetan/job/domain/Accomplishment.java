package ir.zabetan.job.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Accomplishment.
 */
@Document(collection = "accomplishment")
public class Accomplishment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("publication")
    private String publication;

    @Field("certification")
    private String certification;

    @Field("patent")
    private String patent;

    @Field("course")
    private String course;

    @Field("project")
    private String project;

    @Field("honor_and_reward")
    private String honorAndReward;

    @Field("test_score")
    private String testScore;

    @Field("language")
    private String language;

    @Field("organization")
    private String organization;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPublication() {
        return publication;
    }

    public Accomplishment publication(String publication) {
        this.publication = publication;
        return this;
    }

    public void setPublication(String publication) {
        this.publication = publication;
    }

    public String getCertification() {
        return certification;
    }

    public Accomplishment certification(String certification) {
        this.certification = certification;
        return this;
    }

    public void setCertification(String certification) {
        this.certification = certification;
    }

    public String getPatent() {
        return patent;
    }

    public Accomplishment patent(String patent) {
        this.patent = patent;
        return this;
    }

    public void setPatent(String patent) {
        this.patent = patent;
    }

    public String getCourse() {
        return course;
    }

    public Accomplishment course(String course) {
        this.course = course;
        return this;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getProject() {
        return project;
    }

    public Accomplishment project(String project) {
        this.project = project;
        return this;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getHonorAndReward() {
        return honorAndReward;
    }

    public Accomplishment honorAndReward(String honorAndReward) {
        this.honorAndReward = honorAndReward;
        return this;
    }

    public void setHonorAndReward(String honorAndReward) {
        this.honorAndReward = honorAndReward;
    }

    public String getTestScore() {
        return testScore;
    }

    public Accomplishment testScore(String testScore) {
        this.testScore = testScore;
        return this;
    }

    public void setTestScore(String testScore) {
        this.testScore = testScore;
    }

    public String getLanguage() {
        return language;
    }

    public Accomplishment language(String language) {
        this.language = language;
        return this;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getOrganization() {
        return organization;
    }

    public Accomplishment organization(String organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
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
        Accomplishment accomplishment = (Accomplishment) o;
        if (accomplishment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accomplishment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Accomplishment{" +
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
