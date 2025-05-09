package com.petfolio.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reminders")
public class Reminders {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reminderid;
	
	private String username;
	private String description;
	private String time;
	private String date;
	public Reminders(int reminderid, String username, String description, String time, String date) {
		super();
		this.reminderid = reminderid;
		this.username = username;
		this.description = description;
		this.time = time;
		this.date = date;
	}
	public int getReminderid() {
		return reminderid;
	}
	public void setReminderid(int reminderid) {
		this.reminderid = reminderid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	
	
}
