package com.nci.project.pobalhub.pobalhubbackend;

import com.nci.project.pobalhub.pobalhubbackend.model.Property;
import com.nci.project.pobalhub.pobalhubbackend.service.PropertyService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PobalHubBackEndApplication {

    public static void main(String[] args) {
        SpringApplication.run(PobalHubBackEndApplication.class, args);
    }

    @Bean
    public CommandLineRunner testPropertyService(PropertyService propertyService) {
        return args -> {
            // fetch all properties
            System.out.println("Properties found with findAll():");
            System.out.println("-------------------------------");
            for (Property property : propertyService.findAll()) {
                System.out.println(property.toString());
            }
            System.out.println();

            // add a new property and then fetch it
            System.out.println("Creating and finding a new property:");
            System.out.println("-------------------------------");
            Property newProperty = new Property();
            // set the properties of newProperty as required
            newProperty = propertyService.save(newProperty);
            System.out.println(propertyService.findAll());
            System.out.println();
        };
    }
}
