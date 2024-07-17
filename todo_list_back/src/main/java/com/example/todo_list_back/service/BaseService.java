package com.example.todo_list_back.service;

import java.util.List;

public interface BaseService <TPost, TGet>{
    boolean create(TPost t);
    boolean update(Long id, TPost t);
    boolean delete(Long id);
    List<TGet> getAll();
    TGet getById(Long id);

}
