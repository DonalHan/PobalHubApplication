package com.nci.project.pobalhub.pobalhubbackend.controller;

import com.nci.project.pobalhub.pobalhubbackend.model.PropertyImage;
import com.nci.project.pobalhub.pobalhubbackend.service.PropertyImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/property-images")
public class PropertyImageController {

    private final PropertyImageService propertyImageService;

    @Autowired
    public PropertyImageController(PropertyImageService propertyImageService) {
        this.propertyImageService = propertyImageService;
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<PropertyImage>> getImagesByPropertyId(@PathVariable Integer propertyId) {
        List<PropertyImage> images = propertyImageService.getImagesByPropertyId(propertyId);
        return ResponseEntity.ok(images);
    }
}
