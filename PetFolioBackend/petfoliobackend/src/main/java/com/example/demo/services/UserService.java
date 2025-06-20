package com.example.demo.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Users;
import com.example.demo.repositories.UserRepo;

@Service
public class UserService {
	
	@Autowired
	private UserRepo userrepo;
	
	public String adduser(Users newuser){
		userrepo.save(newuser);
		return "User registration success";
	}
	
	public String userlogin(Users user) {
		Users existinguser = userrepo.findByUseremailAndPassword(user.getUseremail(), user.getPassword());
		
		if (existinguser != null) {
			return "Login successfull";
		}else {
			return "Invalid credential";
		}
	}
}
