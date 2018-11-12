package ir.zabetan.job.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TestScore entity.
 */
public class TestScoreDTO implements Serializable {

    private String id;

    private String name;

    private String associatedWith;

    private Float score;

    private Instant date;

    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAssociatedWith() {
        return associatedWith;
    }

    public void setAssociatedWith(String associatedWith) {
        this.associatedWith = associatedWith;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
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

        TestScoreDTO testScoreDTO = (TestScoreDTO) o;
        if (testScoreDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testScoreDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestScoreDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", associatedWith='" + getAssociatedWith() + "'" +
            ", score=" + getScore() +
            ", date='" + getDate() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
