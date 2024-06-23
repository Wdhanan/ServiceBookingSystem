package com.codeHanan.ServiceBookingSystem.services.authentication;

import com.codeHanan.ServiceBookingSystem.dto.SignupRequestDTO;
import com.codeHanan.ServiceBookingSystem.entity.User;
import com.codeHanan.ServiceBookingSystem.enums.UserRole;
import com.codeHanan.ServiceBookingSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.codeHanan.ServiceBookingSystem.dto.UserDto;

@Service
public class AuthServiceImpl implements  AuthService {

    @Autowired
    private UserRepository userRepository; // injection of the UserRepository

    public UserDto signupClient(SignupRequestDTO signupRequestDTO){

        User user = new User();
        user.setName(signupRequestDTO.getName());
        user.setLastname(signupRequestDTO.getLastname());
        user.setEmail(signupRequestDTO.getEmail());
        user.setPhone(signupRequestDTO.getPhone());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequestDTO.getPassword())); // encrypt the Pass
        user.setRole(UserRole.CLIENT); // Client

        return userRepository.save(user).getDto(); // save the user into the Database and return the dto from it

    }

    public Boolean presentByEmail (String email){

        return  userRepository.findFirstByEmail(email) !=null; // return true or false
    }

    public UserDto signupCompany(SignupRequestDTO signupRequestDTO){

        User user = new User();
        user.setName(signupRequestDTO.getName());
        user.setAdress(signupRequestDTO.getAdress());
        user.setEmail(signupRequestDTO.getEmail());
        user.setPhone(signupRequestDTO.getPhone());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequestDTO.getPassword()));// encrypt the password
        user.setRole(UserRole.COMPANY); // Company

        return userRepository.save(user).getDto(); // save the user into the Database and return the dto from it

    }
}
