package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Users;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userservice;
	
	@PostMapping("/register")
	public ResponseEntity<String> adduser(@RequestBody Users newuser){
		return new ResponseEntity<String>(userservice.adduser(newuser), HttpStatus.OK);
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<String> loginusercredential(@RequestBody Users user){
		return new ResponseEntity<String>(userservice.userlogin(user), HttpStatus.OK);
	}
}
