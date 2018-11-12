package ir.zabetan.job.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Certification entity.
 */
public class CertificationDTO implements Serializable {

    private String id;

    private String name;

    private String certificationAuthority;

    private String licenseNumber;

    private Instant startDate;

    private Instant endDate;

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

    public String getCertificationAuthority() {
        return certificationAuthority;
    }

    public void setCertificationAuthority(String certificationAuthority) {
        this.certificationAuthority = certificationAuthority;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CertificationDTO certificationDTO = (CertificationDTO) o;
        if (certificationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), certificationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CertificationDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", certificationAuthority='" + getCertificationAuthority() + "'" +
            ", licenseNumber='" + getLicenseNumber() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
