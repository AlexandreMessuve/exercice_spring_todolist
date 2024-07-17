package com.example.todo_list_back.repository;

import com.example.todo_list_back.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
