package com.nci.project.pobalhub.pobalhubbackend.controller;

import com.nci.project.pobalhub.pobalhubbackend.model.Property;
import com.nci.project.pobalhub.pobalhubbackend.service.PropertyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
/*This is the main controller through which the client interacts with the Property logic and DB*/
@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> properties = propertyService.findAll();
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    @GetMapping("/{propertyId}/appreciation")
    public ResponseEntity<Map<Integer, Double>> getPropertyAppreciation(@PathVariable Integer propertyId) {
        Map<Integer, Double> appreciation = propertyService.getPropertyAppreciation(propertyId);
        return new ResponseEntity<>(appreciation, HttpStatus.OK);
    }
}
