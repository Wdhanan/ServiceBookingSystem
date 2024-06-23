package com.codeHanan.ServiceBookingSystem.services.company;

import com.codeHanan.ServiceBookingSystem.dto.AdDTO;
import com.codeHanan.ServiceBookingSystem.entity.Ad;
import com.codeHanan.ServiceBookingSystem.repository.AdRepository;
import com.codeHanan.ServiceBookingSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.codeHanan.ServiceBookingSystem.entity.User;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdRepository adRepository;

    //to post new Ad we need to know which user is (userId) then the DTO he wants to post
    public  boolean postAd(Long userId, AdDTO adDTO) throws IOException {
        Optional<User> optionalUser = userRepository.findById(userId);
        // check if the user is present
        if(optionalUser.isPresent()){
            Ad  ad = new Ad();
            ad.setDescription(adDTO.getDescription());
            ad.setServiceName(adDTO.getServiceName());
            ad.setImg(adDTO.getImg().getBytes());// get Bytes from the MultiPartFile
            ad.setPrice(adDTO.getPrice());
            ad.setUser(optionalUser.get()); // save user

            adRepository.save(ad); // save into the database

            return true;
        }
        return false;


    }

    public List<AdDTO> getAllAds (Long userId){

        return adRepository.findAllByUserId(userId).stream().map(Ad::getAdDto).collect(Collectors.toList());

    }

}
