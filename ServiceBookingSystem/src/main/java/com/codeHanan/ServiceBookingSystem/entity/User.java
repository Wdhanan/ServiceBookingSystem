package com.codeHanan.ServiceBookingSystem.entity;


import com.codeHanan.ServiceBookingSystem.dto.UserDto;
import com.codeHanan.ServiceBookingSystem.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table( name ="users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String name;

    private String lastname;

    private String phone;

    private String adress;


    // Enum of Roles (Company / Client)
    private UserRole role;


    public UserDto getDto(){
        UserDto userDto = new UserDto();
        userDto.setId(id);
        userDto.setName(name);
        userDto.setEmail(email);
        userDto.setPhone(phone);
        userDto.setPassword(password);
        userDto.setLastname(lastname);
        userDto.setRole(role);


        return userDto;

    }

}


