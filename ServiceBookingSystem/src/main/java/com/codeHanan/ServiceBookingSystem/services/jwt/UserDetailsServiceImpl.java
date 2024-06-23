package com.codeHanan.ServiceBookingSystem.services.jwt;

import com.codeHanan.ServiceBookingSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;
import com.codeHanan.ServiceBookingSystem.entity.User;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findFirstByEmail(email);

        if (user == null) throw new UsernameNotFoundException("Username not found", null);
        return  new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());

    }
}
