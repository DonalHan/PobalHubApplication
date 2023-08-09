package com.nci.project.pobalhub.pobalhubbackend.service;

import com.nci.project.pobalhub.pobalhubbackend.model.PropertyImage;
import com.nci.project.pobalhub.pobalhubbackend.repository.PropertyImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
/*Main Service logic for the Property Image functionality*/

@Service
public class PropertyImageService {

    private final PropertyImageRepository propertyImageRepository;

    @Autowired
    public PropertyImageService(PropertyImageRepository propertyImageRepository) {
        this.propertyImageRepository = propertyImageRepository;
    }

    public List<PropertyImage> getImagesByPropertyId(Integer propertyId) { //getter for all the images
        return propertyImageRepository.findByPropertyId(propertyId);
    }
}
