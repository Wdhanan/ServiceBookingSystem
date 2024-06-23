package com.codeHanan.ServiceBookingSystem.repository;

import com.codeHanan.ServiceBookingSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findFirstByEmail(String email); // find a user by his mail
}
