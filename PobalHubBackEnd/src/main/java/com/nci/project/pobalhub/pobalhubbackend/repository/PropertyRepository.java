package com.nci.project.pobalhub.pobalhubbackend.repository;

import com.nci.project.pobalhub.pobalhubbackend.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Integer> {
}
