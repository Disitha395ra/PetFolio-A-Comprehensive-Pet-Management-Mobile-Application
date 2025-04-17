package com.petfolio.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pets")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int petid;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private User user;

    private String username;
    private String petname;
    private int petage;
    private String gender;
    private LocalDate birthdate;
    private String description;
    private String photo;

    // Constructors
    public Pet() {}

    public Pet(int petid, User user, String username, String petname, int petage, String gender, LocalDate birthdate, String photo, String description) {
        this.petid = petid;
        this.user = user;
        this.username = username;
        this.petname = petname;
        this.petage = petage;
        this.gender = gender;
        this.birthdate = birthdate;
        this.description = description;
        this.photo = photo;
    }

    // Getters and Setters
    public int getPetid() {
        return petid;
    }

    public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setPetid(int petid) {
        this.petid = petid;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPetname() {
        return petname;
    }

    public void setPetname(String petname) {
        this.petname = petname;
    }

    public int getPetage() {
        return petage;
    }

    public void setPetage(int petage) {
        this.petage = petage;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
