package com.HcmutS3MRS.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;


@Data
@Builder
@FieldDefaults(level =  AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    String idUser 		;
    String userName  ;
    String name;
    String fullName;
    String studentCode;
    String password	 ;
    String email;
    String phoneNumber;
    String gender;
    Date dateOfBirth;

}

