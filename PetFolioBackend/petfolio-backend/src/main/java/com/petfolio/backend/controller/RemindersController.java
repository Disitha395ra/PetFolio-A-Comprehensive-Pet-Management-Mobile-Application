package com.petfolio.backend.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

import com.petfolio.backend.model.Reminders;

@RestController
@RequestMapping("/api/reminder")
@CrossOrigin(origins="*") 
public class RemindersController {

	

	@PostMapping("/addreminder")
	public String addnewreminder(@RequestBody Reminders reminder) {
		String dbUrl = "jdbc:mysql://localhost:3306/petfolio";
		String dbUsername = "root";
		String dbPassword = "";
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
            String sql = "INSERT INTO reminders (username, description, time, date) VALUES (?, ?, ?,?)";
            
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, reminder.getUsername());
            stmt.setString(2, reminder.getDescription());
            stmt.setString(3, reminder.getTime());
            stmt.setString(4, reminder.getDate());
            
            stmt.executeUpdate();
            
            return "Reminder Add Successfully";
		}catch(Exception e) {
			e.printStackTrace();
			return "Reminder Set Error"+e.getMessage();
		}
	}
	
	@GetMapping("/getreminder")
	public ResponseEntity<?> getPetreminders(@RequestParam String username) {
	    String dbUrl = "jdbc:mysql://localhost:3306/petfolio";
	    String dbUsername = "root";
	    String dbPassword = "";

	    StringBuilder output = new StringBuilder();

	    try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        Connection conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
	        String sql = "SELECT * FROM reminders WHERE username = ?";

	        PreparedStatement stmt = conn.prepareStatement(sql);
	        stmt.setString(1, username);

	        ResultSet rs = stmt.executeQuery();

	        while (rs.next()) {
	            //output.append("ID: ").append(rs.getInt("id")).append(", ");
	            output.append("Date: ").append(rs.getString("date")).append(", ");
	            output.append("Description: ").append(rs.getString("description")).append(", ");
	            output.append("Time: ").append(rs.getString("time")).append(", ");
	            output.append("Username: ").append(rs.getString("username")).append("\n");
	        }

	        rs.close();
	        stmt.close();
	        conn.close();

	        if (output.length() == 0) {
	            return ResponseEntity.ok("No reminders found for username: " + username);
	        }

	        return ResponseEntity.ok(output.toString());

	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(500).body("Reminders fetching error: " + e.getMessage());
	    }
	}
}
