package com.example.graphql.helper;

public class ExceptionHandler {

    public static RuntimeException throwResourceNotFoundException(){
        return new RuntimeException("RESOURCE NOT FOUND!");
    }
}
