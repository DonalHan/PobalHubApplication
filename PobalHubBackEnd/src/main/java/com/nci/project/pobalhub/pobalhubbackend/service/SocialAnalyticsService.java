package com.nci.project.pobalhub.pobalhubbackend.service;

import com.nci.project.pobalhub.pobalhubbackend.model.Property;
import com.nci.project.pobalhub.pobalhubbackend.model.SocialAnalytics;
import com.nci.project.pobalhub.pobalhubbackend.repository.SocialAnalyticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SocialAnalyticsService {

    private final SocialAnalyticsRepository socialAnalyticsRepository;

    @Autowired
    public SocialAnalyticsService(SocialAnalyticsRepository socialAnalyticsRepository) {
        this.socialAnalyticsRepository = socialAnalyticsRepository;
    }

    public SocialAnalytics getSocialAnalyticsForProperty(Integer propertyId) {
        return socialAnalyticsRepository.findById(propertyId)
                .orElseGet(() -> calculateAndStoreSocialAnalytics(propertyId));
    }

    private SocialAnalytics calculateAndStoreSocialAnalytics(Integer propertyId) {
        // We'll need to fetch the property to get its coordinates
        Property property = getPropertyById(propertyId); // You'll need to implement this

        // Make the Mapbox API calls to calculate the social analytics here

        SocialAnalytics analytics = new SocialAnalytics();

        // Set the values on the analytics object
        analytics.setId(propertyId);
        analytics.setProperty(property);
        // Set the calculated values
        analytics.setCityCenter(cityCenter);
        analytics.setTransport(transport);
        analytics.setParksBeachesGreenways(parksBeachesGreenways);

        // Save the analytics to the database
        socialAnalyticsRepository.save(analytics);

        return analytics;
    }
}
