package com.HcmutS3MRS.mapper;

import com.HcmutS3MRS.entity.Complaint;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ComplaintMapper {
    @Mapping( target =  "idComplaint", ignore = true)
    Complaint toComplain ( Complaint complaint);
}
