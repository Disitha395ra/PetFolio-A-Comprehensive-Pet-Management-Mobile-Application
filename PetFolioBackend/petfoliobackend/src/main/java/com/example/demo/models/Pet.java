package com.example.demo.models;

import jakarta.persistence.*;

@Entity
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String petname;
    private String petbirthday;
    private String petgender;
    private String petnote;

    // Constructors
    public Pet() {}

    public Pet(String username, String petname, String petbirthday, String petgender, String petnote) {
        this.username = username;
        this.petname = petname;
        this.petbirthday = petbirthday;
        this.petgender = petgender;
        this.petnote = petnote;
    }

    // Getters and Setters
    // (Use Lombok @Data if preferred to reduce boilerplate)
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPetname() {
        return petname;
    }

    public String getPetbirthday() {
        return petbirthday;
    }

    public String getPetgender() {
        return petgender;
    }

    public String getPetnote() {
        return petnote;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPetname(String petname) {
        this.petname = petname;
    }

    public void setPetbirthday(String petbirthday) {
        this.petbirthday = petbirthday;
    }

    public void setPetgender(String petgender) {
        this.petgender = petgender;
    }

    public void setPetnote(String petnote) {
        this.petnote = petnote;
    }
}