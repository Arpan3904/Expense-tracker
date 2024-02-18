package com.example.expence.controller;

import com.example.expence.entity.Group;

import com.example.expence.entity.User;
import com.example.expence.repository.GroupRepository;
import com.example.expence.service.GroupService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class GroupController {
    @Autowired
    private GroupService groupService;


    @Autowired
    private GroupRepository groupRepository;
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addgroup")
    public ResponseEntity<?> addGroup(@RequestBody Group group) {
        try {

            groupService.saveGroup(group);

            Map<String, String> response = new HashMap<>();
            response.put("message", group.getGroupName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error during Add Group: " + e.getMessage()); // Include the exception message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/groups")
    public ResponseEntity<?> getGroup() {
        try {

            List<Group> grps= groupService.getAllGroup();


            Map<String, String> response = new HashMap<>();
            response.put("message","grop sent");
            return ResponseEntity.ok(grps);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error during Add Group: " + e.getMessage()); // Include the exception message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @GetMapping("/groups/{groupId}/members")
    public List<User> getMembersByGroupId(@PathVariable Long groupId) {
        return groupService.getMembersByGroupId(groupId);
    }


}
