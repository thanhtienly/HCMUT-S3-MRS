package com.HcmutS3MRS.service;


import com.HcmutS3MRS.dto.request.UserRequest;
import com.HcmutS3MRS.dto.response.ApiResponse;
import com.HcmutS3MRS.entity.User;
import com.HcmutS3MRS.exception.AppException;
import com.HcmutS3MRS.exception.ErrorCode;
import com.HcmutS3MRS.mapper.UserMapper;
import com.HcmutS3MRS.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)


public class UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    UserMapper userMapper;

    public User createUser(User user) {
        Optional<User> existUser = userRepository.findByUserName(user.getUserName());
        if (!existUser.isPresent()) {
            User newUser = userMapper.toUser(user);
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(newUser);

        } else {
            throw new AppException(ErrorCode.USERNAME_ALREADY_EXIST);
        }
    }

    public ApiResponse<User> authenticateUser(UserRequest userRequest) {

        User userUser = userRepository.findByUserName(userRequest.getUserName()).orElseThrow(
                () -> new AppException(ErrorCode.USERNAME_NOT_EXIST)
        );

//        log.info(userUser.toString());

        boolean authenticate = passwordEncoder.matches(userRequest.getPassword(), userUser.getPassword());
        if (authenticate) {
            return ApiResponse.<User>builder().code("200").message("success").entity(userUser).build();
        } else {
            return ApiResponse.<User>builder().code("401").message("fail").build();
        }

    }

    public User getSpecificUser(String maUser) {

        return userRepository.findById(maUser)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXIST));

    }

    public String updateUser(String maUser, User user) {
        User userUpdate = getSpecificUser(maUser);
        userMapper.updateUser(userUpdate, user);
        userRepository.save(userUpdate);
        return "update success";

    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }
}

