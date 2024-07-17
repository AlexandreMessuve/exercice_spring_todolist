package com.example.todo_list_back.dto;

import lombok.Data;

@Data
public class ResponseDto {
    private Object message, data;

    public ResponseDto(Object message){
        this.message = message;
    }
    public ResponseDto(Object message, Object data) {
        this.message = message;
        this.data = data;
    }
}
