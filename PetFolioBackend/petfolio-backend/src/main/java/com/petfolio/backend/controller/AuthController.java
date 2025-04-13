package com.petfolio.backend.controller;

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
			
		}catch(Exception e) {
			e.printStackTrace();
			return "User Registration Error"+e.getMessage();
		}
	}

}
