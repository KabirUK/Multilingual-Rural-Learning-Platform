package com.rurallportal.learningportal.controller;

import com.rurallportal.learningportal.entity.User;
import com.rurallportal.learningportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // allow frontend JS from any domain
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Register a new user.
     * Accepts POST requests at /api/register
     */
    @PostMapping("/register")
    public Map<String, String> registerUser(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        // Call service layer to register user
        String msg = userService.register(user);

        if (msg.toLowerCase().contains("success")) {
            response.put("status", "success");
            response.put("message", msg);
        } else {
            response.put("status", "fail");
            response.put("message", msg);
        }

        return response;
    }

    /**
     * Login user.
     * Accepts POST requests at /api/login
     */
    @PostMapping("/login")
    public Map<String, String> loginUser(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        // Call service layer to authenticate user
        User existingUser = userService.login(user.getEmail(), user.getPassword());

        if (existingUser != null) {
            response.put("status", "success");
            response.put("role", existingUser.getRole());
            response.put("message", "Login Successful");
        } else {
            response.put("status", "fail");
            response.put("message", "Invalid Credentials");
        }

        return response;
    }
}