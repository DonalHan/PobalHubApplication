package com.nci.project.pobalhub.pobalhubbackend.service;

import com.nci.project.pobalhub.pobalhubbackend.model.NeighborhoodPrice;
import com.nci.project.pobalhub.pobalhubbackend.model.Property;
import com.nci.project.pobalhub.pobalhubbackend.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final NeighborhoodService neighborhoodService;

    public PropertyService(PropertyRepository propertyRepository, NeighborhoodService neighborhoodService) {
        this.propertyRepository = propertyRepository;
        this.neighborhoodService = neighborhoodService;
    }

    public List<Property> findAll() {
        return propertyRepository.findAll();
    }

    public Property save(Property property) {
        return propertyRepository.save(property);
    }

    /*A method that reverse engineers the price appreciation of a property based off of the neighborhood average it comes from*/
    public Map<Integer, Double> getPropertyAppreciation(Integer propertyId) {
        /* Retrieve the property */
        Property property = propertyRepository.findById(propertyId).orElse(null);
        /* Validation */
        if (property == null) {
            return null;
        }
        /* Get the current price of the property at hand */
        double currentPrice = property.getPrice().doubleValue();
        /* Get the neighborhood appreciation data */
        List<NeighborhoodPrice> neighborhoodPriceAppreciation = neighborhoodService.getPriceHistory(property.getNeighborhood().getId());

        /* Storing the results (year and price) in a map */
        Map<Integer, Double>  propertyAppreciation = new HashMap<>();
        double averageGrowthRate = 0.0;
        for (int i = neighborhoodPriceAppreciation.size() - 1; i > 0; i--) { /*Reverse for loop*/
            /* Get the price in the current year */
            double currentYearPrice = neighborhoodPriceAppreciation.get(i).getAveragePrice().doubleValue(); //.doubleValue converts BigDecimal into double
            /* Get the price in the previous year */
            double previousYearPrice = neighborhoodPriceAppreciation.get(i - 1).getAveragePrice().doubleValue();
            /* Calculate the price difference between the current year and the previous year */
            double priceDifference = currentYearPrice - previousYearPrice;
            /* Calculate the growth rate as the price difference divided by the price in the previous year */
            double growthRate = priceDifference / previousYearPrice;
            averageGrowthRate = averageGrowthRate + growthRate;
            /* Reverse engineer the appreciation of the current property pricez */
            currentPrice = currentPrice / (1 + growthRate);
            /* Store the calculated property price in the map with its corresponding year */
            propertyAppreciation.put(neighborhoodPriceAppreciation.get(i - 1).getYear(), currentPrice);
        }
        averageGrowthRate = averageGrowthRate / (neighborhoodPriceAppreciation.size() - 1);
        /* Predict the future property prices */
        currentPrice = property.getPrice().doubleValue();
        for (int i = 1; i <= 10; i++) {
            currentPrice = currentPrice * (1 + averageGrowthRate);
            propertyAppreciation.put(neighborhoodPriceAppreciation.get(neighborhoodPriceAppreciation.size() - 1).getYear() + i, currentPrice);
        }
        return propertyAppreciation;
    }




}
