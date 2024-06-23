package com.codeHanan.ServiceBookingSystem.controller;

import com.codeHanan.ServiceBookingSystem.dto.AuthenticationRequest;
import com.codeHanan.ServiceBookingSystem.dto.SignupRequestDTO;
import com.codeHanan.ServiceBookingSystem.entity.User;
import com.codeHanan.ServiceBookingSystem.repository.UserRepository;
import com.codeHanan.ServiceBookingSystem.services.authentication.AuthService;
import com.codeHanan.ServiceBookingSystem.services.jwt.UserDetailsServiceImpl;
import com.codeHanan.ServiceBookingSystem.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.codeHanan.ServiceBookingSystem.dto.UserDto;

import java.io.IOException;

@CrossOrigin(maxAge = 3600)
@RestController
public class AuthenticationController {

    @Autowired
    private UserDetailsServiceImpl userDetailsService; // to create the JWTToken

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;// handle the login or logout logic

    public static final String TOKEN_PREFIX ="Bearer ";

    public static final  String HEADER_STRING = "Authorization";

    @PostMapping("/client/sign-up")
    public ResponseEntity<?> signupClient(@RequestBody SignupRequestDTO signupRequestDTO){

        // if the user wants to register with a mail which already exits
        if(authService.presentByEmail(signupRequestDTO.getEmail())){
            return new ResponseEntity<>("Client already exists with this Email!", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto createadUser = authService.signupClient(signupRequestDTO);
        return  new ResponseEntity<>(createadUser, HttpStatus.OK);


    }

    @PostMapping("/company/sign-up")
    public ResponseEntity<?> signupCompany(@RequestBody SignupRequestDTO signupRequestDTO){

        // if the user wants to register with a mail which already exits
        if(authService.presentByEmail(signupRequestDTO.getEmail())){
            return new ResponseEntity<>("Company already exists with this Email!", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto createadUser = authService.signupCompany(signupRequestDTO);
        return  new ResponseEntity<>(createadUser, HttpStatus.OK);


    }


    @CrossOrigin("http://localhost:4200/")
    @PostMapping("/authenticate")
    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws IOException, JSONException {

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e){
            throw  new BadCredentialsException("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        User user = userRepository.findFirstByEmail(authenticationRequest.getUsername());

        // set the details( id and role) in the response
        response.getWriter().write(new JSONObject()
                .put("userId", user.getId())
                .put("role", user.getRole())
                .toString()
        );

        // Expose The Headers for our Angular Client
        response.addHeader("Access-Control-Expose-Headers", "Authorization");
        response.addHeader("Access-Control-Allow-Headers", "Authorization," +
                "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");

        response.addHeader(HEADER_STRING, TOKEN_PREFIX+jwt);

    }


}
