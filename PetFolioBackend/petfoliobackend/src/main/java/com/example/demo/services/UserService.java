package com.example.demo.services;

import com.example.demo.models.Users;
import com.example.demo.repositories.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepo userrepo;

    public String adduser(Users newuser) {
        userrepo.save(newuser);
        return "User registration success";
    }

    public Map<String, String> userlogin(Users user) {
        Users existinguser = userrepo.findByUseremailAndPassword(user.getUseremail(), user.getPassword());

        Map<String, String> response = new HashMap<>();

        if (existinguser != null) {
            response.put("message", "Login successful");
            response.put("username", existinguser.getUsername());
            response.put("email", existinguser.getUseremail());
        } else {
            response.put("error", "Invalid credentials");
        }

        return response;
    }
}
