package com.petfolio.backend.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins="*") 
public class UserController {
	
	String dbUrl = "jdbc:mysql://localhost:3306/petfolio";
	String dbUsername = "root";
	String dbPassword = "";

	@PostMapping("/profile")
	public ResponseEntity<?> getUserProfile(@RequestBody Map<String, String> body){
		String username = body.get("username");
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection conn = DriverManager.getConnection(dbUrl, dbUsername,dbPassword);
			String sql = "SELECT * FROM users WHERE username=?";
			
			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setString(1, username);
			
			var rs = stmt.executeQuery();
			
			if(rs.next()) {
				Map<String,Object> userData = new HashMap<>();
				userData.put("username", rs.getString("username"));
				userData.put("email", rs.getString("email"));
				
				return ResponseEntity.ok(userData);
			}else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
			}
			
		}catch(Exception e) {
			e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
			
		}
	}
	
	@PostMapping("/update")
	public ResponseEntity<?> updateUserProfile(@RequestBody Map<String, String> body){
		String username = body.get("username");
		String email = body.get("email");
		String password = body.get("password");
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
	        Connection conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
	        
	        String sql = "UPDATE users SET email = ?, password = ? WHERE username = ?";
	        PreparedStatement stmt = conn.prepareStatement(sql);
	        stmt.setString(1, email);
	        stmt.setString(2, password);
	        stmt.setString(3, username);

	        int rowsUpdated = stmt.executeUpdate();

	        if (rowsUpdated > 0) {
	            Map<String, Object> response = new HashMap<>();
	            response.put("message", "User profile updated successfully");
	            return ResponseEntity.ok(response);
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	        }
	        
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
		}
	}
	
	
}
