package com.nci.project.pobalhub.pobalhubbackend.controller;
import com.nci.project.pobalhub.pobalhubbackend.model.SocialAnalytics;
import com.nci.project.pobalhub.pobalhubbackend.service.SocialAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/social-analytics")
public class SocialAnalyticsController {

    private final SocialAnalyticsService socialAnalyticsService;

    @Autowired
    public SocialAnalyticsController(SocialAnalyticsService socialAnalyticsService) {
        this.socialAnalyticsService = socialAnalyticsService;
    }

    @GetMapping("/{propertyId}")
    public ResponseEntity<SocialAnalytics> getSocialAnalytics(@PathVariable Integer propertyId) {
        SocialAnalytics analytics = socialAnalyticsService.getSocialAnalyticsForProperty(propertyId);
        if (analytics != null) {
            return ResponseEntity.ok(analytics);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping("/")
    public ResponseEntity<SocialAnalytics> storeSocialAnalytics(@RequestBody SocialAnalytics analytics) {
        SocialAnalytics storedAnalytics = socialAnalyticsService.storeSocialAnalyticsForProperty(analytics);
        return ResponseEntity.ok(storedAnalytics);
    }
}
