package com.nci.project.pobalhub.pobalhubbackend.service;

import com.nci.project.pobalhub.pobalhubbackend.model.Neighborhood;
import com.nci.project.pobalhub.pobalhubbackend.model.NeighborhoodPrice;
import com.nci.project.pobalhub.pobalhubbackend.model.Property;
import com.nci.project.pobalhub.pobalhubbackend.repository.NeighborhoodPriceRepository;
import com.nci.project.pobalhub.pobalhubbackend.repository.NeighborhoodRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
/*Main Service logic for the neighborhood functionality*/
@Service
public class NeighborhoodService {

    private final NeighborhoodPriceRepository neighborhoodPriceRepository;
    private final NeighborhoodRepository neighborhoodRepository;

    public NeighborhoodService(NeighborhoodPriceRepository neighborhoodPriceRepository, NeighborhoodRepository neighborhoodRepository) {
        this.neighborhoodPriceRepository = neighborhoodPriceRepository;
        this.neighborhoodRepository = neighborhoodRepository;
    }

    public List<Neighborhood> findAll() {
        return neighborhoodRepository.findAll();
    }

    public Neighborhood findById(Integer id)//Finds a Neighborhood By ID from the DB
    {
        return neighborhoodRepository.findById(id).orElse(null);
    }

    public BigDecimal getAveragePrice(int neighborhoodId)
    {
        Neighborhood neighborhood = findById(neighborhoodId);
        return neighborhood != null ? neighborhood.getAveragePrice() :null;
    }

    public List<NeighborhoodPrice> getPriceHistory(int neighborhoodId) { //Retrieves all of the price history for a neighborhood form the DB, returns a list
        return neighborhoodPriceRepository.findByNeighborhood_Id(neighborhoodId);
    }




}
