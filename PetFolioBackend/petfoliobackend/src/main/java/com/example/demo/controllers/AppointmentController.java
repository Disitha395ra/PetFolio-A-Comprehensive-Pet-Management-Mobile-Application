package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Appointment;
import com.example.demo.services.AppointmentService;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/get/{username}")
    public List<Appointment> getAppointments(@PathVariable String username) {
        return appointmentService.getAppointmentsByUsername(username);
    }

    @PostMapping("/add")
    public Appointment addAppointment(@RequestBody Appointment appointment) {
        return appointmentService.addAppointment(appointment);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }
}
