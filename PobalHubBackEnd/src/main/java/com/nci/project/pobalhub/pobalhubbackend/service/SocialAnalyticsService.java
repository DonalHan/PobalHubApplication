package com.nci.project.pobalhub.pobalhubbackend.service;

import com.nci.project.pobalhub.pobalhubbackend.model.Property;
import com.nci.project.pobalhub.pobalhubbackend.model.SocialAnalytics;
import com.nci.project.pobalhub.pobalhubbackend.repository.SocialAnalyticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/*Main Service logic for the SocialAnalytics functionality*/

@Service
public class SocialAnalyticsService {

    private final SocialAnalyticsRepository socialAnalyticsRepository;

    @Autowired
    public SocialAnalyticsService(SocialAnalyticsRepository socialAnalyticsRepository) {
        this.socialAnalyticsRepository = socialAnalyticsRepository;
    }

    public SocialAnalytics getSocialAnalyticsForProperty(Integer propertyId) {
        return socialAnalyticsRepository.findById(propertyId).orElse(null);
    }

    public SocialAnalytics storeSocialAnalyticsForProperty(SocialAnalytics analytics) {
        return socialAnalyticsRepository.save(analytics);
    }
}
