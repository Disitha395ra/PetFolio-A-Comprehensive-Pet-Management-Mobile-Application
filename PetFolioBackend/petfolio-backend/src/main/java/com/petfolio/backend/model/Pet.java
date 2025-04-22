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
    private String petage;
    private String gender;
    private String birthdate;
    private String description;
    private String photo;
	public Pet(int petid, User user, String username, String petname, String petage, String gender, String birthdate,
			String description, String photo) {
		super();
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
	public int getPetid() {
		return petid;
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
	public String getPetage() {
		return petage;
	}
	public void setPetage(String petage) {
		this.petage = petage;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getBirthdate() {
		return birthdate;
	}
	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}

    // Constructors
    
}
