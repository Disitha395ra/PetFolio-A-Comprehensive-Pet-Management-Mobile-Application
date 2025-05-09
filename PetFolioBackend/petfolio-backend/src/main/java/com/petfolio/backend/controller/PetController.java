package com.petfolio.backend.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petfolio.backend.model.User;
import com.petfolio.backend.model.Pet;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetController { 

    @GetMapping("/profile")
    public ResponseEntity<?> getPetProfile(@RequestParam String username) {

        String dbUrl = "jdbc:mysql://localhost:3306/petfolio";
        String dbUsername = "root";
        String dbPassword = "";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
            String sql = "SELECT * FROM userspets WHERE username=?";

            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, username);

            var rs = stmt.executeQuery();

            if (rs.next()) {
                Map<String, Object> petData = new HashMap<>();
                petData.put("username", rs.getString("username"));
                petData.put("petname", rs.getString("petname"));
                petData.put("petage", rs.getString("petage"));
                petData.put("petgender", rs.getString("petgender"));
                petData.put("petbirthday", rs.getString("petbirthday"));
                petData.put("petdescription", rs.getString("petdescription"));

                return ResponseEntity.ok(petData);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pets not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
    @GetMapping("/add")
    public String addnewpet(@RequestBody Pet pet) {
    	String dbUrl = "jdbc:mysql://localhost:3306/petfolio";
        String dbUsername = "root";
        String dbPassword = "";
    	try {
    		Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
            String sql = "INSERT INTO userspets (username, petname, petage, petgender, petbirthday, petdescription) VALUES (?, ?, ?,?,?,?)";
            
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, pet.getUsername());
            stmt.setString(2, pet.getPetname());
            stmt.setString(3, pet.getPetage());
            stmt.setString(4, pet.getPetgender());
            stmt.setString(5, pet.getPetbirthday());
            stmt.setString(6, pet.getPetdescription());
            
            stmt.executeUpdate();
            
            return "Pet Add Successfully";
    	}catch(Exception e) {
    		e.printStackTrace();
			return "Pet Registration Error"+e.getMessage();
    	}
    }
    
    
    
}
