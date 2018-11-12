package ir.zabetan.job.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Publication entity.
 */
public class PublicationDTO implements Serializable {

    private String id;

    private String title;

    private String publication;

    private Instant date;

    private String author;

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

    public String getPublication() {
        return publication;
    }

    public void setPublication(String publication) {
        this.publication = publication;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PublicationDTO publicationDTO = (PublicationDTO) o;
        if (publicationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), publicationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PublicationDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", publication='" + getPublication() + "'" +
            ", date='" + getDate() + "'" +
            ", author='" + getAuthor() + "'" +
            "}";
    }
}
