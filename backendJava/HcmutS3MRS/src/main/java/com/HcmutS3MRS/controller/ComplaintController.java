package com.HcmutS3MRS.controller;

import com.HcmutS3MRS.entity.Complaint;
import com.HcmutS3MRS.service.ComplaintService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaint")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ComplaintController {
    ComplaintService complaintService;
    @PostMapping("/create")
    public Complaint createComplaint (@RequestBody Complaint complaint){
         return complaintService.createComplaint(complaint);

    }
    @GetMapping("/{idUser}")
    public List<Complaint> getListComplaintById (@PathVariable String idUser ){
        return complaintService.getListComplaintByIdUser(idUser) ;

    }
    @DeleteMapping("/delete/{idComplaint}")
    public String deleteComplaint (@PathVariable String idComplaint) {
         return complaintService.deleteComplaint(idComplaint);
    }
}


