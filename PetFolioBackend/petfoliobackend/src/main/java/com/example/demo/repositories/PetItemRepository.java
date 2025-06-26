package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.models.PetItem;

import java.util.List;

@Repository
public interface PetItemRepository extends JpaRepository<PetItem, Long> {
    List<PetItem> findByCategory(String category);
    
    @Query("SELECT p FROM PetItem p WHERE p.stock > 0")
    List<PetItem> findAvailableItems();
    
    @Query("SELECT p FROM PetItem p WHERE p.name LIKE %?1%")
    List<PetItem> findByNameContaining(String name);
}
