package com.example.demo.repositories;

import com.example.demo.models.PetItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetItemRepository extends JpaRepository<PetItem, Long> {
}

