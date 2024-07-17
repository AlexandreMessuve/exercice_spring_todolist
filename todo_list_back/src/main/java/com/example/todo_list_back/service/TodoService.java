package com.example.todo_list_back.service;

import com.example.todo_list_back.dto.todo.TodoDtoGet;
import com.example.todo_list_back.dto.todo.TodoDtoPost;
import com.example.todo_list_back.dto.user.UserDtoGet;
import com.example.todo_list_back.entity.Todo;
import com.example.todo_list_back.entity.User;
import com.example.todo_list_back.exception.NotFoundException;
import com.example.todo_list_back.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class TodoService implements BaseService<TodoDtoPost, TodoDtoGet> {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private UserService userService;

    @Override
    public boolean create(TodoDtoPost t) {
        Todo todo = todoDtoPostToTodo(t);
        todoRepository.save(todo);
        return true;
    }

    @Override
    public boolean update(Long id,TodoDtoPost t) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Todo todo = getTodoById(id);
        if (!Objects.equals(currentUser.getId(), todo.getUser().getId())) {
            return false;
        }
            todo.setTitle(t.getTitle());
            todo.setDescription(t.getDescription());
            todo.setCompleted(t.isCompleted());
            todo.setUpdatedAt(LocalDateTime.now());
            todoRepository.save(todo);
            return true;

    }

    @Override
    public boolean delete(Long id) {
        Todo todo = getTodoById(id);
        todoRepository.delete(todo);
        return true;
    }

    @Override
    public List<TodoDtoGet> getAll() {
        return todoListToTodoDtoGetList(todoRepository.findAll());
    }

    @Override
    public TodoDtoGet getById(Long id) {
        return todoToTodoDtoGet(getTodoById(id));
    }

    private Todo getTodoById(Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new NotFoundException("Not found todo with id"+id));
    }
    private Todo todoDtoPostToTodo(TodoDtoPost todoDtoPost) {
        User user = userService.getUserById(todoDtoPost.getUserId());
        return Todo.builder()
                .title(todoDtoPost.getTitle())
                .description(todoDtoPost.getDescription())
                .completed(todoDtoPost.isCompleted())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .user(user)
                .build();

    }

    private TodoDtoGet todoToTodoDtoGet(Todo todo) {
        UserDtoGet user = userService.getUserDtoGetById(todo.getUser().getId());
        return TodoDtoGet.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .description(todo.getDescription())
                .completed(todo.isCompleted())
                .createdAt(todo.getCreatedAt())
                .updatedAt(todo.getUpdatedAt())
                .user(user)
                .build();
    }

    private List<TodoDtoGet> todoListToTodoDtoGetList(List<Todo> todoList) {
        return todoList.stream().map(this::todoToTodoDtoGet).collect(Collectors.toList());
    }
}
