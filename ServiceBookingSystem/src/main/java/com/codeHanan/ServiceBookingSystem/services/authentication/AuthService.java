package com.codeHanan.ServiceBookingSystem.services.authentication;

import com.codeHanan.ServiceBookingSystem.dto.SignupRequestDTO;
import com.codeHanan.ServiceBookingSystem.dto.UserDto;

public interface AuthService {

    public UserDto signupClient(SignupRequestDTO signupRequestDTO);
    public Boolean presentByEmail (String email);
    UserDto signupCompany(SignupRequestDTO signupRequestDTO);
}
