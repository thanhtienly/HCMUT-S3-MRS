package com.HcmutS3MRS.service;

import com.HcmutS3MRS.entity.Complaint;
import com.HcmutS3MRS.mapper.ComplaintMapper;
import com.HcmutS3MRS.repository.ComplaintRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ComplaintService {
    ComplaintRepository complaintRepository;
    ComplaintMapper complaintMapper;
   public Complaint createComplaint ( Complaint complaint){
         Complaint newComplaint = complaintMapper.toComplain(complaint);
         return complaintRepository.save(newComplaint);
   }
   public List<Complaint> getListComplaintByIdUser( String idUser){
          return complaintRepository.findByIdUser(idUser);
   }
   public String deleteComplaint (String idUser){
       complaintRepository.deleteById(idUser);
       return "success";
   }

}
