package com.nci.project.pobalhub.pobalhubbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
/*Mapping Social Analytics for hibernate ORM to the database*/

@Entity
@Table(name = "social_analytics")
public class SocialAnalytics {

    @Id
    @Column(name = "property_id")
    private Integer id;

    @Column(name = "social_score")
    private Integer socialScore;

    @Column(name = "amenities")
    private Integer amenities;

    @Column(name = "city_center")
    private Integer cityCenter;

    @Column(name = "transport")
    private Integer transport;

    @Column(name = "parks_beaches_greenways")
    private Integer parksBeachesGreenways;

    @Column(name = "crime")
    private Integer crime;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "property_id")
    @MapsId
    private Property property;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSocialScore() {
        return socialScore;
    }

    public void setSocialScore(Integer socialScore) {
        this.socialScore = socialScore;
    }

    public Integer getAmenities() {
        return amenities;
    }

    public void setAmenities(Integer amenities) {
        this.amenities = amenities;
    }

    public Integer getCityCenter() {
        return cityCenter;
    }

    public void setCityCenter(Integer cityCenter) {
        this.cityCenter = cityCenter;
    }

    public Integer getTransport() {
        return transport;
    }

    public void setTransport(Integer transport) {
        this.transport = transport;
    }

    public Integer getParksBeachesGreenways() {
        return parksBeachesGreenways;
    }

    public void setParksBeachesGreenways(Integer parksBeachesGreenways) {
        this.parksBeachesGreenways = parksBeachesGreenways;
    }

    public Integer getCrime() {
        return crime;
    }

    public void setCrime(Integer crime) {
        this.crime = crime;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
}
