package com.example.todo_list_back.repository;

import com.example.todo_list_back.entity.Todo;
import com.example.todo_list_back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUser(User user);
}
