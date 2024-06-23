package com.codeHanan.ServiceBookingSystem.dto;

import com.codeHanan.ServiceBookingSystem.enums.UserRole;
import lombok.Data;


@Data
public class SignupRequestDTO {

    private Long id;

    private String email;

    private String password;

    private String name;

    private String lastname;

    private String phone;

    private String adress;



}
