package com.example.todo_list_back.controller;

import com.example.todo_list_back.dto.todo.TodoDtoGet;
import com.example.todo_list_back.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
public class TodoController {
    @Autowired
    private TodoService todoService;

    @GetMapping("/")
    public List<TodoDtoGet> getAll() {
        return todoService.getAll();
    }

    @GetMapping("/{id}")
    public TodoDtoGet getById(@PathVariable Long id) {
        return todoService.getById(id);
    }
}
