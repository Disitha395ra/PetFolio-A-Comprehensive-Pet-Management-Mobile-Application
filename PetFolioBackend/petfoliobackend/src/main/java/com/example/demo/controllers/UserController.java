package com.example.demo.controllers;

import com.example.demo.models.Users;
import com.example.demo.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userservice;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> adduser(@RequestBody Users newuser) {
        String result = userservice.adduser(newuser);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginusercredential(@RequestBody Users user) {
        Map<String, String> result = userservice.userlogin(user);
        if (result.containsKey("error")) {
            return new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
        } else {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @PutMapping("/update/{username}")
    public ResponseEntity<Map<String, String>> updateUser(
            @PathVariable String username,
            @RequestBody Users updatedUser
    ) {
        Map<String, String> result = userservice.updateUser(username, updatedUser);
        if (result.containsKey("error")) {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @GetMapping("/get/{username}")
    public ResponseEntity<Users> getUserByUsername(@PathVariable String username) {
        Users user = userservice.getUserByUsername(username);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
