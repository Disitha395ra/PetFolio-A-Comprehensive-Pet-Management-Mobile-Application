package com.petfolio.backend.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petfolio.backend.model.Pet;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins="*") 
public class PetController {
	
	String dbUrl = "jdbc:mysql://localhost:3306/petfolio";
	String dbUsername = "root";
	String dbPassword = "";
	
	@GetMapping("/profile")
	public ResponseEntity<?> getPetProfile(@RequestParam String username){
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection conn = DriverManager.getConnection(dbUrl, dbUsername,dbPassword);
			String sql = "SELECT * FROM pets WHERE username = ?";
	        PreparedStatement stmt = conn.prepareStatement(sql);
	        stmt.setString(1, username);
	        ResultSet rs = stmt.executeQuery();

	        ArrayList<Map<String, Object>> pets = new ArrayList<>();
	        while (rs.next()) {
	            Map<String, Object> pet = new HashMap<>();
	            pet.put("petid", rs.getInt("petid"));
	            pet.put("userid", rs.getInt("userid"));
	            pet.put("username", rs.getString("username"));
	            pet.put("petname", rs.getString("petname"));
	            pet.put("petage", rs.getInt("petage"));
	            pet.put("gender", rs.getString("gender"));
	            pet.put("birthdate", rs.getString("birthdate"));
	            pet.put("photo", rs.getString("photo"));
	            pets.add(pet);
	        }

	        rs.close();
	        stmt.close();
	        conn.close();

	        return ResponseEntity.ok(pets);
			
			
			
		}catch(Exception e) {
			e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());

		}
	}
	
	@PostMapping("/add")
	public String addnewpet(@RequestBody Pet pet) {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
			String sql = "INSERT INTO pets (username, petname, petage, gender, birthdate,description) VALUES (?, ?, ?,?,?,?)";
			
			PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, pet.getUsername());
            stmt.setString(2, pet.getPetname());
            stmt.setString(3, pet.getPetage());
            stmt.setString(4, pet.getGender());
            stmt.setString(5, pet.getBirthdate());
            stmt.setString(6, pet.getDescription());
            
            stmt.executeUpdate();

            return "User registered successfully";
			
		}catch(Exception e) {
			e.printStackTrace();
			return "User Registration Error"+e.getMessage();
		}
	}
}
