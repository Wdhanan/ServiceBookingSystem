package com.codeHanan.ServiceBookingSystem.entity;

import com.codeHanan.ServiceBookingSystem.dto.AdDTO;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name ="ads")
@Data
public class Ad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String serviceName;
    private String description;
    private Double price;

    @Lob // to store large amount of data
    @Column(columnDefinition = "longblob")
    private byte[] img;

    @ManyToOne(fetch = FetchType.LAZY, optional = false ) // One User can create many Ads (Many Ads to one User)
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    public AdDTO getAdDto(){
        AdDTO adto = new AdDTO();
        adto.setId(id);
        adto.setServiceName(serviceName);
        adto.setPrice(price);
        adto.setDescription(description);
        adto.setReturnedImg(img);
        adto.setCompanyName(user.getName());

        return  adto;

    }

}
