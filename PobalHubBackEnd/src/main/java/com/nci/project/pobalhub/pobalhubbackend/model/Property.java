package com.nci.project.pobalhub.pobalhubbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;
/*Mapping Property for hibernate ORM to the database*/

@Entity
@Table(name = "property")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "property_id")
    private Integer id;

    @Column(name = "address")
    private String address;

    @Column(name = "eircode")
    private String eircode;

    @Column(name = "type")
    private String type;

    @Column(name = "price")
    private BigDecimal price;


    @Column(name = "property_description")
    private String propertyDescription;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @JsonBackReference //This is used to prevent infinite mapping with respect to foreign keys
    @ManyToOne
    @JoinColumn(name = "neighborhood_id")
    private Neighborhood neighborhood;

    @Transient
    private Integer neighborhoodId;

    @JsonManagedReference
    @OneToOne(mappedBy = "property")
    private SocialAnalytics socialAnalytics;

    @JsonManagedReference
    @OneToMany(mappedBy = "property")
    private List<PropertyImage> propertyImages;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEircode() {
        return eircode;
    }

    public void setEircode(String eircode) {
        this.eircode = eircode;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getPropertyDescription() {
        return propertyDescription;
    }

    public void setPropertyDescription(String propertyDescription) {
        this.propertyDescription = propertyDescription;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public Neighborhood getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(Neighborhood neighborhood) {
        this.neighborhood = neighborhood;
        if (neighborhood != null) {
            this.neighborhoodId = neighborhood.getId();
        }
    }

    public SocialAnalytics getSocialAnalytics() {
        return socialAnalytics;
    }

    public void setSocialAnalytics(SocialAnalytics socialAnalytics) {
        this.socialAnalytics = socialAnalytics;
    }

    public List<PropertyImage> getPropertyImages() {
        return propertyImages;
    }

    public void setPropertyImages(List<PropertyImage> propertyImages) {
        this.propertyImages = propertyImages;
    }

    public Integer getNeighborhoodId() {
        return this.neighborhood.getId();
    }


    @Override
    public String toString() {
        return "Property{" +
                "id=" + id +
                ", address='" + address + '\'' +
                ", eircode='" + eircode + '\'' +
                ", type='" + type + '\'' +
                ", price='" + price + '\'' +
                ", propertyDescription='" + propertyDescription + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", neighborhood=" + neighborhood +
                ", socialAnalytics=" + socialAnalytics +
                '}';
    }
}
