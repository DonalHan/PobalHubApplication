package com.nci.project.pobalhub.pobalhubbackend.model;

import jakarta.persistence.GenerationType;
import jakarta.persistence.*;

import java.math.BigDecimal;


@Entity
@Table(name = "neighborhood_prices")
public class NeighborhoodPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "neighborhood_id", nullable = false)
    private Neighborhood neighborhood;

    @Column(name = "year")
    private Integer year;

    @Column(name = "average_price")
    private BigDecimal averagePrice;


}
