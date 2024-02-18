package com.example.expence.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.expence.entity.User;
import com.example.expence.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username)
    {
        return userRepository.findByUsername(username);
    }
    public User findByEmail(String email)
    {
        return userRepository.findByUsername(email);
    }
//    public List<User> getMembersByGroupId(Long groupId) {
//        // Implement the logic to fetch members by group ID from the repository
//        // For example:
//        return userRepository.findByGroupId(groupId);
//    }

}
