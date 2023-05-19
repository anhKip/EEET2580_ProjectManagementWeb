package com.example.backend.service;

public interface CrudService<T> {
    T create(T t);

    T retrieve(Long id);

    T update(T t);

    String delete(Long id);
}
