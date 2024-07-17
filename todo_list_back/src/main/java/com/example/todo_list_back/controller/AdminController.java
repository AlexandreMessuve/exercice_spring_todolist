package com.example.todo_list_back.controller;

import com.example.todo_list_back.dto.ResponseDto;
import com.example.todo_list_back.dto.todo.TodoDtoPost;
import com.example.todo_list_back.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private TodoService todoService;

    @PostMapping("/createTodo")
    public ResponseDto addTodo(@RequestBody TodoDtoPost todoDtoPost) {
        if (todoService.create(todoDtoPost)){
            return new ResponseDto("Success", "Todo created");
        }
        return new ResponseDto("Error", "Todo creation failed");
    }

    @PutMapping("/updateTodo")
    public ResponseDto updateTodo(@RequestParam Long id, @RequestBody TodoDtoPost todoDtoPost) {
        if (todoService.update(id, todoDtoPost)){
            return new ResponseDto("Success", "Todo updated");
        }
        return new ResponseDto("Error", "Todo update failed");
    }

    @DeleteMapping("/deleteTodo")
    public ResponseDto deleteTodo(@RequestParam Long id) {
        if (todoService.delete(id)){
            return new ResponseDto("Success", "Todo deleted");
        }
        return new ResponseDto("Error", "Todo deletion failed");
    }


}