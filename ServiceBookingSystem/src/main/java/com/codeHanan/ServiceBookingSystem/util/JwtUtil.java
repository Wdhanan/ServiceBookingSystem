package com.codeHanan.ServiceBookingSystem.util;

import com.codeHanan.ServiceBookingSystem.dto.SignupRequestDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {
    //secret for  the JWTtoken generated from any password website like Generate Random
    public static final  String SECRET ="kWITS4Z8DW4Op4kT1M/kt8i8PKjBnHS63zn+RDHj0IoYYBQnsNfDb2pSrHqk/XSi";

    //create token Method
    private String createToken(Map<String, Object> claims, String username){

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*30))
                .signWith(SignatureAlgorithm.HS256, getSignKey()).compact();
    }

    // decrypt the Key
    private Key getSignKey() {
        byte [] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // method to generate Token
    public String generateToken(String userName){
        Map<String, Object> claims = new HashMap<>();

        return  createToken(claims, userName); // call the method to create our Token
    }

    // extract all the Claims from JWt

    private Claims extractAllClaims(String token){
        return  Jwts
                .parser()
                .setSigningKey(getSignKey())
                .parseClaimsJws(token) // verify the jwt with the signature
                .getBody();
    }

    //Extract a particular Claim
    public <T> T extractClaim (String token, Function<Claims, T> claimsResolver){
        final  Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    //Extract the Expiration
    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }
    //Extract the username
    public String extractUsername(String token){
        return  extractClaim(token, Claims::getSubject);
    }

    //Check the Expiration of Token
    private Boolean isTokenExpired(String token){
        return  extractExpiration(token).before(new Date());
    }

    //validate the Token userDetails from Spring security
    public Boolean validateToken(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
