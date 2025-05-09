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
}
