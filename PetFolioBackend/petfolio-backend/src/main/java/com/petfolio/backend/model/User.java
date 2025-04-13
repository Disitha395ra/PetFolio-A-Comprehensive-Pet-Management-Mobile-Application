package com.petfolio.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String username;
	private String email;
	private String password;
	private String confirmpassword;
	public User(int id, String username, String email, String password, String confirmpassword) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.confirmpassword = confirmpassword;
	}
	
	
}
