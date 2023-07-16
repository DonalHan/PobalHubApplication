package com.nci.project.pobalhub.pobalhubbackend.controller;

import com.nci.project.pobalhub.pobalhubbackend.model.Neighborhood;
import com.nci.project.pobalhub.pobalhubbackend.service.NeighborhoodService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/neighborhood")
public class NeighborhoodController {
    private final NeighborhoodService neighborhoodService;

    public NeighborhoodController(NeighborhoodService neighborhoodService) {
        this.neighborhoodService = neighborhoodService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Neighborhood> getNeighborhood(@PathVariable Integer id) {
        Neighborhood neighborhood = neighborhoodService.findById(id);
        return new ResponseEntity<>(neighborhood, HttpStatus.OK);
    }
}
