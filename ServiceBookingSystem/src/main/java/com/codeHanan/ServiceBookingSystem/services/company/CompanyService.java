package com.codeHanan.ServiceBookingSystem.services.company;

import com.codeHanan.ServiceBookingSystem.dto.AdDTO;

import java.io.IOException;
import java.util.List;

public interface CompanyService {
    public  boolean postAd(Long userId, AdDTO adDTO) throws IOException;
    public List<AdDTO> getAllAds (Long userId);
}
