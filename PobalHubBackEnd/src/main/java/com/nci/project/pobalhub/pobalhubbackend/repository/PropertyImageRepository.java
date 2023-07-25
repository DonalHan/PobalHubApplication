package com.nci.project.pobalhub.pobalhubbackend.repository;
import com.nci.project.pobalhub.pobalhubbackend.model.PropertyImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyImageRepository extends JpaRepository<PropertyImage, Integer> {
    List<PropertyImage> findByPropertyId(Integer propertyId);
}
