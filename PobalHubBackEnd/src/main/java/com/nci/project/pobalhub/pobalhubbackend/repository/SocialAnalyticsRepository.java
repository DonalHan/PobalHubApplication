package com.nci.project.pobalhub.pobalhubbackend.repository;

import com.nci.project.pobalhub.pobalhubbackend.model.SocialAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialAnalyticsRepository extends JpaRepository<SocialAnalytics, Integer> {
}

