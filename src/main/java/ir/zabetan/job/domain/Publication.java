package ir.zabetan.job.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Publication.
 */
@Document(collection = "publication")
public class Publication implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("title")
    private String title;

    @Field("publication")
    private String publication;

    @Field("date")
    private Instant date;

    @Field("author")
    private String author;

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

    public Publication title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPublication() {
        return publication;
    }

    public Publication publication(String publication) {
        this.publication = publication;
        return this;
    }

    public void setPublication(String publication) {
        this.publication = publication;
    }

    public Instant getDate() {
        return date;
    }

    public Publication date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getAuthor() {
        return author;
    }

    public Publication author(String author) {
        this.author = author;
        return this;
    }

    public void setAuthor(String author) {
        this.author = author;
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
        Publication publication = (Publication) o;
        if (publication.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), publication.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Publication{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", publication='" + getPublication() + "'" +
            ", date='" + getDate() + "'" +
            ", author='" + getAuthor() + "'" +
            "}";
    }
}
