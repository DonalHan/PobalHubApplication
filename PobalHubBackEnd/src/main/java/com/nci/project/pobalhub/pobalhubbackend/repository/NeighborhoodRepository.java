package com.nci.project.pobalhub.pobalhubbackend.repository;
import com.nci.project.pobalhub.pobalhubbackend.model.Neighborhood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NeighborhoodRepository extends JpaRepository<Neighborhood, Integer>
{

}
