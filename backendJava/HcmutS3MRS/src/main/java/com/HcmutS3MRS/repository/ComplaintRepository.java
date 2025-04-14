package com.HcmutS3MRS.repository;



import com.HcmutS3MRS.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ComplaintRepository extends JpaRepository<Complaint,String> {
    List<Complaint> findByIdUser(String idUser);
}

