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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Neighborhood getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(Neighborhood neighborhood) {
        this.neighborhood = neighborhood;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public BigDecimal getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(BigDecimal averagePrice) {
        this.averagePrice = averagePrice;
    }
}
