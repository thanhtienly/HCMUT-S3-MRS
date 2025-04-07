package com.HcmutS3MRS.exception;

public enum ErrorCode {

    USERNAME_ALREADY_EXIST("401", "Username already exits, please chose another username"),
    USERNAME_NOT_EXIST("401","Username is not exits, please try again"),
    USER_NOT_EXIST("9","User is not exist, please try again");
     private ErrorCode(String code , String message ) {
              this.code= code;
              this.message= message;
     }

    public String getMessage() {
        return message;
    }

    public String getCode() {
        return code;
    }

    private final String code;
        private final String message;
}
