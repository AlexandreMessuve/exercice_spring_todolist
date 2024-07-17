package com.example.todo_list_back.controller;

import com.example.todo_list_back.dto.todo.TodoDtoGet;
import com.example.todo_list_back.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
public class TodoController {
    @Autowired
    private TodoService todoService;

    @GetMapping
    public List<TodoDtoGet> getAll() {
        return todoService.getAll();
    }

    @GetMapping
    public TodoDtoGet getById(@RequestParam Long id) {
        return todoService.getById(id);
    }
}
