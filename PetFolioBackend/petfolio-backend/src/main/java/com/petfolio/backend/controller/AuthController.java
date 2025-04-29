package com.petfolio.backend.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;


import com.petfolio.backend.model.User;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="*") 
public class AuthController {
	
	String dbUrl = "jdbc:mysql://localhost:3306/petfolio";
	String dbUsername = "root";
	String dbPassword = "";
	
	@PostMapping("/register")
	public String registeruser(@RequestBody User user) {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
			String sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
			String sql1 = "INSERT INTO userspets (username) VALUES (?)";
			
			PreparedStatement stmt = conn.prepareStatement(sql);
			PreparedStatement stmt1 = conn.prepareStatement(sql1);
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPassword());
            stmt1.setString(1,  user.getUsername());
            
            stmt.executeUpdate();
            stmt1.executeUpdate();

            return "User registered successfully";
		}catch(Exception e) {
			e.printStackTrace();
			return "User Registration Error"+e.getMessage();
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginuser(@RequestBody User user) {
	    try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        Connection conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
	        String sql = "SELECT * FROM users WHERE email = ? AND password = ?";
	        
	        PreparedStatement stmt = conn.prepareStatement(sql);
	        stmt.setString(1, user.getEmail());
	        stmt.setString(2, user.getPassword());
	        
	        var resultSet = stmt.executeQuery();
	        
	        if (resultSet.next()) {
	            // Create a JSON-style response
	            Map<String, Object> response = new HashMap<>();
	            response.put("status", "success");
	            response.put("username", resultSet.getString("username"));
	            response.put("email", resultSet.getString("email"));

	            return ResponseEntity.ok(response); // ✅ returns JSON
	        } else {
	            Map<String, Object> response = new HashMap<>();
	            response.put("status", "error");
	            response.put("message", "Invalid email or password");

	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        Map<String, Object> response = new HashMap<>();
	        response.put("status", "error");
	        response.put("message", "User login error: " + e.getMessage());

	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}

}
