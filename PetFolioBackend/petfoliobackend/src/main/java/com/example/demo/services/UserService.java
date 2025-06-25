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

    public Map<String, String> updateUser(String username, Users updatedUser) {
        Map<String, String> response = new HashMap<>();
        Users existingUser = userrepo.findByUsername(username);

        if (existingUser == null) {
            response.put("error", "User not found");
        } else {
            existingUser.setUseremail(updatedUser.getUseremail());
            existingUser.setPhone(updatedUser.getPhone());
            userrepo.save(existingUser);
            response.put("message", "User updated successfully");
        }

        return response;
    }

    public Users getUserByUsername(String username) {
        return userrepo.findByUsername(username);
    }
}
