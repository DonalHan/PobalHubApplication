package com.nci.project.pobalhub.pobalhubbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "property_image")
public class PropertyImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Integer id;

    @Column(name ="image_path")
    private String imagePath;

    @ManyToOne
    @JoinColumn(name ="property_id")
    private Property property;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
}
