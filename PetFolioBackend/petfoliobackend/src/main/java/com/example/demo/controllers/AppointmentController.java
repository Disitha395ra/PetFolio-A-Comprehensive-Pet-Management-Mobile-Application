package com.example.demo.controllers;

import com.example.demo.models.Appointment;
import com.example.demo.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentRepository repo;

    @PostMapping("/add")
    public Appointment add(@RequestBody Appointment a) {
        return repo.save(a);
    }

    @GetMapping("/get/{username}")
    public List<Appointment> getUserAppointments(@PathVariable String username) {
        return repo.findByUsername(username);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        repo.deleteById(id);
        return "Deleted";
    }
}