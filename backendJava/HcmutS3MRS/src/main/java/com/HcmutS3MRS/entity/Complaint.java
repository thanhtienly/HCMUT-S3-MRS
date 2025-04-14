package com.HcmutS3MRS.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;


@Data
@Builder
@FieldDefaults(level =  AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Complaint {
    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    String  idComplaint 		;
    String idUser;
    String idStudent;
    String email;
    String phoneNumber;
    String  title 			;
    String content;

}
 

