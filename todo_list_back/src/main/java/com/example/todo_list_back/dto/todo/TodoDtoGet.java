package com.example.todo_list_back.dto.todo;

import com.example.todo_list_back.dto.user.UserDtoGet;
import com.example.todo_list_back.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class TodoDtoGet {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private UserDtoGet user;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
