package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Pet;
import com.example.demo.services.PetService;

@RestController
@RequestMapping("/pet")
@CrossOrigin(origins = "*") 
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @PostMapping("/addpet")
    public ResponseEntity<?> addPet(@RequestBody Pet pet) {
        Pet savedPet = petService.addPet(pet);
        return ResponseEntity.ok(savedPet);
    }

    @GetMapping("/getpets/{username}")
    public ResponseEntity<?> getPetsByUsername(@PathVariable String username) {
        List<Pet> pets = petService.getPetsByUsername(username);
        return ResponseEntity.ok(pets);
    }
}