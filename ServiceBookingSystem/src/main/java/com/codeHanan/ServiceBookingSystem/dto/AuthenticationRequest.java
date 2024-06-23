package com.codeHanan.ServiceBookingSystem.dto;

import lombok.Data;

@Data// to have getter and setters
public class AuthenticationRequest { // like LoginDTO
    private String username;
    private String password;
}
