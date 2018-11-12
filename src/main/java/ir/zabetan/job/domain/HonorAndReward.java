package ir.zabetan.job.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A HonorAndReward.
 */
@Document(collection = "honor_and_reward")
public class HonorAndReward implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("title")
    private String title;

    @Field("associated_with")
    private String associatedWith;

    @Field("issue")
    private String issue;

    @Field("date")
    private Instant date;

    @Field("description")
    private String description;

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

    public HonorAndReward title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAssociatedWith() {
        return associatedWith;
    }

    public HonorAndReward associatedWith(String associatedWith) {
        this.associatedWith = associatedWith;
        return this;
    }

    public void setAssociatedWith(String associatedWith) {
        this.associatedWith = associatedWith;
    }

    public String getIssue() {
        return issue;
    }

    public HonorAndReward issue(String issue) {
        this.issue = issue;
        return this;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public Instant getDate() {
        return date;
    }

    public HonorAndReward date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public HonorAndReward description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
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
        HonorAndReward honorAndReward = (HonorAndReward) o;
        if (honorAndReward.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), honorAndReward.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HonorAndReward{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", associatedWith='" + getAssociatedWith() + "'" +
            ", issue='" + getIssue() + "'" +
            ", date='" + getDate() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
