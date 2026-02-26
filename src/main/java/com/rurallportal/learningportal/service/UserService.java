package com.rurallportal.learningportal.service;

import com.rurallportal.learningportal.entity.User;
import com.rurallportal.learningportal.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    /**
     * Register a new user
     * @param user - User object from frontend
     * @return message for frontend
     */
    public String register(User user) {
        // Check if email already exists
        User existingUser = userRepo.findByEmail(user.getEmail());

        if (existingUser != null) {
            return "Email already registered!";
        }

        // Save new user directly to DB
        userRepo.save(user);
        return "Registration Successful!";
    }

    /**
     * Login user
     * @param email - user's email
     * @param password - user's password
     * @return User object if credentials match, null otherwise
     */
    public User login(String email, String password) {
        // Find user by email
        User user = userRepo.findByEmail(email);

        // Check password
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }

        return null;
    }
}