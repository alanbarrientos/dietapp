package com.example.springbootdieta.controller;

import com.example.springbootdieta.dao.UserRepository;
import com.example.springbootdieta.dao.WeightRepository;
import com.example.springbootdieta.model.User;
import com.example.springbootdieta.model.Weight;
import com.example.springbootdieta.model.Weight.WeightDto;
import com.example.springbootdieta.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
//@CrossOrigin(origins="*")
@RequestMapping("/user")
public class UserController {
    @Autowired
    WeightRepository weightRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtTokenUtil jwtTokenUtil;



//    @GetMapping("/displayadmin")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    public String displayToAdmin() {
//        return "Display only to admin";
//    }

//    @GetMapping("/allusers")
//    public String displayUsers() {
//
//        return "Display All Users, "+ SecurityContextHolder.getContext().getAuthentication().getName() +" is asking...";
//
//    }

    @GetMapping("/displayuser")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public String displayToUser() {
        return "Display to both user and admin";
    }

    @GetMapping("/getweighthistory")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getWeightHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        return ResponseEntity.ok()
                .body(weightRepository.findAllByUser_UserName(currentPrincipalName).stream()
                        .map(w->w.toDto())
                        .collect(Collectors.toList()));
    }

    @PostMapping("/postweight")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> saveNewWeight(@Validated @RequestBody WeightDto weightR) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.getUserByUserName(currentPrincipalName);
        Weight weight = Weight.fromDto(weightR);
        weight.setUser(user);
        weightRepository.save(weight);
        return ResponseEntity.ok().build();
    }

}
