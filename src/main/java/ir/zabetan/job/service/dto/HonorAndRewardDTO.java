package ir.zabetan.job.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the HonorAndReward entity.
 */
public class HonorAndRewardDTO implements Serializable {

    private String id;

    private String title;

    private String associatedWith;

    private String issue;

    private Instant date;

    private String description;

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

    public String getAssociatedWith() {
        return associatedWith;
    }

    public void setAssociatedWith(String associatedWith) {
        this.associatedWith = associatedWith;
    }

    public String getIssue() {
        return issue;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        HonorAndRewardDTO honorAndRewardDTO = (HonorAndRewardDTO) o;
        if (honorAndRewardDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), honorAndRewardDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HonorAndRewardDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", associatedWith='" + getAssociatedWith() + "'" +
            ", issue='" + getIssue() + "'" +
            ", date='" + getDate() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
