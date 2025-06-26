package com.example.demo.services;

import com.example.demo.models.PetItem;
import com.example.demo.repositories.PetItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetItemService {

    private final PetItemRepository petItemRepository;

    public PetItemService(PetItemRepository petItemRepository) {
        this.petItemRepository = petItemRepository;
    }

    public List<PetItem> getAllPetItems() {
        return petItemRepository.findAll();
    }
}
