package com.petfolio.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "userspets")
public class Pet{
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int prtid;
	
	private String username;
	private String petname;
	private String petage;
	private String petgender;
	private String petbirthday;
	private String petdescription;
	public Pet(int prtid, String username, String petname, String petage, String petgender, String petbirthday,
			String petdescription) {
		super();
		this.prtid = prtid;
		this.username = username;
		this.petname = petname;
		this.petage = petage;
		this.petgender = petgender;
		this.petbirthday = petbirthday;
		this.petdescription = petdescription;
	}
	public int getPrtid() {
		return prtid;
	}
	public void setPrtid(int prtid) {
		this.prtid = prtid;
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
	public String getPetgender() {
		return petgender;
	}
	public void setPetgender(String petgender) {
		this.petgender = petgender;
	}
	public String getPetbirthday() {
		return petbirthday;
	}
	public void setPetbirthday(String petbirthday) {
		this.petbirthday = petbirthday;
	}
	public String getPetdescription() {
		return petdescription;
	}
	public void setPetdescription(String petdescription) {
		this.petdescription = petdescription;
	}
	
	
	
}