package com.HcmutS3MRS.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApiResponse<T> {
      String code;
      String message;
      T entity;
     public ApiResponse(String code, String message) {
        this.code = code;
        this.message = message;

    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setEntity(T entity) {
        this.entity = entity;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public T getEntity() {
        return entity;
    }
}
