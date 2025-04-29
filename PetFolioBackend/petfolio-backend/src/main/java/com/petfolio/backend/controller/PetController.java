package com.petfolio.backend.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetController { 

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestParam String username) {

        String dbUrl = "jdbc:mysql://localhost:3306/petfolio";
        String dbUsername = "root";
        String dbPassword = "";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
            String sql = "SELECT * FROM userspets WHERE username=?";

            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, username);

            var rs = stmt.executeQuery();

            if (rs.next()) {
                Map<String, Object> petData = new HashMap<>();
                petData.put("username", rs.getString("username"));
                petData.put("petname", rs.getString("petname"));
                petData.put("petage", rs.getString("petage"));
                petData.put("petgender", rs.getString("petgender"));
                petData.put("petbirthday", rs.getString("petbirthday"));
                petData.put("petdescription", rs.getString("petdescription"));

                return ResponseEntity.ok(petData);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pets not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
