package com.nci.project.pobalhub.pobalhubbackend.repository;

import com.nci.project.pobalhub.pobalhubbackend.model.NeighborhoodPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NeighborhoodPriceRepository extends JpaRepository<NeighborhoodPrice, Integer> {

    List<NeighborhoodPrice> findByNeighborhood_Id(Integer neighborhoodId);

}
