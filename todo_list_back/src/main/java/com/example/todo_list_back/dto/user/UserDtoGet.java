package com.example.todo_list_back.dto.user;

import com.example.todo_list_back.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDtoGet {
    private Long id;
    private String name;
    private String email;
    private Role role;
}
