package com.example.todo_list_back.dto.todo;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TodoDtoPost {
    @Size(min = 2, message = "min 2 characters required")
    private String title;

    @Size(min = 2, message = "min 2 characters required")
    private String description;

    private boolean completed;

    private Long userId;
}
