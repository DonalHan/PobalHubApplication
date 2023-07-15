package com.nci.project.pobalhub.pobalhubbackend.service;

import com.nci.project.pobalhub.pobalhubbackend.model.NeighborhoodPrice;
import com.nci.project.pobalhub.pobalhubbackend.repository.NeighborhoodPriceRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class NeighborhoodService {

    private final NeighborhoodPriceRepository neighborhoodPriceRepository;

    public NeighborhoodService(NeighborhoodPriceRepository neighborhoodPriceRepository) {
        this.neighborhoodPriceRepository = neighborhoodPriceRepository;
    }


}
