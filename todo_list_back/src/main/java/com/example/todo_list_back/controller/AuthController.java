package com.example.todo_list_back.controller;

import com.example.todo_list_back.dto.ResponseDto;
import com.example.todo_list_back.dto.user.LoginUserDto;
import com.example.todo_list_back.dto.user.RegisterUserDto;
import com.example.todo_list_back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseDto register(@RequestBody RegisterUserDto user) {
        if(userService.addUser(user)){
            return new ResponseDto("success");
        }else{
            return new ResponseDto("fail");
        }
    }

    @PostMapping("/login")
    public ResponseDto login(@RequestBody LoginUserDto userLoginDto) {
        if(userService.checkUserNameExists(userLoginDto.getEmail())){
            if(userService.verifyUser(userLoginDto.getEmail(), userLoginDto.getPassword())){
                String token = userService.generateToken(userLoginDto.getEmail(), userLoginDto.getPassword());
                HashMap<String, Object> data = new HashMap<>();
                data.put("token", token);
                return new ResponseDto("success", data);
            }
        }
        return new ResponseDto("Email or password invalid ! ");
    }

}
