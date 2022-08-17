package com.example.springbootdieta.service;

import com.example.springbootdieta.dao.UserRepository;
import com.example.springbootdieta.model.CustomUser;
import com.example.springbootdieta.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userResitory;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        User user = userResitory.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usear with "
                + "user name " + username + " not found"));
        return CustomUser.createInstance(user);
    }
}
