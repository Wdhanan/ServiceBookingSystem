package com.codeHanan.ServiceBookingSystem.controller;

import com.codeHanan.ServiceBookingSystem.dto.AdDTO;
import com.codeHanan.ServiceBookingSystem.services.company.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/ad/{userId}")
    public ResponseEntity<?> postAd(@PathVariable Long userId, @ModelAttribute AdDTO adDTO) throws IOException { // @ModelAttribute because we want to get the MultipartFile(image) of that
        boolean success = companyService.postAd(userId, adDTO);

        if (success){
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @GetMapping("/ads/{userId}")
    public  ResponseEntity<?> getAllAdsByUserId(@PathVariable Long userId){

        return ResponseEntity.ok(companyService.getAllAds(userId));// get all Ads by user
    }
}
