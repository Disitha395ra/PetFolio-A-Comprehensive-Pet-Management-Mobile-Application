package com.petfolio.backend.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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
			
			PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPassword());
            
            stmt.executeUpdate();

            return "User registered successfully";
		}catch(Exception e) {
			e.printStackTrace();
			return "User Registration Error"+e.getMessage();
		}
	}

}
