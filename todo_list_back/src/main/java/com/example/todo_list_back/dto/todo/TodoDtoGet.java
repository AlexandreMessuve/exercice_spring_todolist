package com.example.todo_list_back.dto.todo;

import com.example.todo_list_back.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class TodoDtoGet {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private User user;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
