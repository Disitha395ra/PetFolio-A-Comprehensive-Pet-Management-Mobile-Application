package com.example.demo.controllers;

import com.example.demo.models.PetItem;
import com.example.demo.services.PetItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") // Allow requests from frontend
@RestController
@RequestMapping("/api/pet-items")
public class PetItemController {

    private final PetItemService petItemService;

    public PetItemController(PetItemService petItemService) {
        this.petItemService = petItemService;
    }

    @GetMapping
    public List<PetItem> getAllPetItems() {
        return petItemService.getAllPetItems();
    }
}

