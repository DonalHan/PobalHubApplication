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
//            // This is to test if properties are being returned from the DB
//            System.out.println("Properties found with findAll():");
//            System.out.println("-------------------------------");
//            for (Property property : propertyService.findAll()) {
//                System.out.println(property.toString());
//            }
//            System.out.println();
        };
    }
}
