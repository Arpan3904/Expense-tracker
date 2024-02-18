package com.example.expence.controller;

// UserController.java

import com.example.expence.entity.User;
import com.example.expence.repository.UserRepository;
import com.example.expence.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;





@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;



    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/checkuser/{username}")
    public User checkUserExistence(@PathVariable String username) {
        User exists = userService.findByUsername(username);
        return exists;
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        try {
            logger.info("Received signup request for username: {}", user.getUsername());

            // Check if the username or email is already registered
            if (userRepository.findByUsername(user.getUsername()) != null ||
                    userRepository.findByEmail(user.getEmail()) != null) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Username or email already registered");
                return ResponseEntity.badRequest().body(response);
            }

            // Encode the password before saving it to the database
            user.setPassword((user.getPassword()));

            // Save the user to the database
            userRepository.save(user);

            Map<String, String> response = new HashMap<>();
            response.put("data", "User registered successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Handle other exceptions if needed
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error during signup");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }





    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {

        // Check if the username exists in the database
        User user = userRepository.findByUsername(loginRequest.getUsername());

        if (user == null || !loginRequest.getPassword().equals(user.getPassword())) {
            // If username does not exist or password does not match, return an error response
            Map<String, String> response = new HashMap<>();
            response.put("error", "Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // Authenticate the user



        // Generate JWT token
        //  String token = JwtUtils.generateToken(loginRequest);


        // Return the token in the response
        Map<String, String> response = new HashMap<>();
        response.put("token", "token");
        response.put("message", "Login successful");
        return ResponseEntity.ok(response);
    }

}