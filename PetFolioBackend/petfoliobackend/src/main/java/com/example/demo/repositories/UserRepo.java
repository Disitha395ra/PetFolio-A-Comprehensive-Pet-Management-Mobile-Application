package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Users;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer>{
	
	Users findByUseremailAndPassword(String useremail, String password);
}
