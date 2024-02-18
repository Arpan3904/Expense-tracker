package com.example.expence.service;
import com.example.expence.entity.Group;
import com.example.expence.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.expence.entity.User;
import com.example.expence.repository.UserRepository;

import java.util.Arrays;
import java.util.List;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;



   public Group  saveGroup(Group group)
    {
       return  groupRepository.save(group);
    }

   public List<Group> getAllGroup()
    {
        return groupRepository.findAll();
    }
    public long findIdByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return user.getId();
        } else {
            // Handle the case where the user with the given username is not found
            return -1; // or throw an exception
        }
    }

    public List<User> getMembersByGroupId(Long groupId) {
        return groupRepository.findByGroupId(groupId);
    }

}
