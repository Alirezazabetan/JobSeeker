package ir.zabetan.job.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Patent entity.
 */
public class PatentDTO implements Serializable {

    private String id;

    private String title;

    private String office;

    private Integer number;

    private String inventory;

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

    public String getOffice() {
        return office;
    }

    public void setOffice(String office) {
        this.office = office;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getInventory() {
        return inventory;
    }

    public void setInventory(String inventory) {
        this.inventory = inventory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PatentDTO patentDTO = (PatentDTO) o;
        if (patentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PatentDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", office='" + getOffice() + "'" +
            ", number=" + getNumber() +
            ", inventory='" + getInventory() + "'" +
            "}";
    }
}
