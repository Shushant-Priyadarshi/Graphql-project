package com.example.graphql.controller;

import com.example.graphql.model.User;
import com.example.graphql.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    //Create user
    @MutationMapping
    public User createUser(@Argument String name,@Argument String email, @Argument String phone,@Argument String password) throws Exception {
        User user =new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword(password);
       return userService.createUser(user);
    }

    //Get All Users
    @QueryMapping(name = "getUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    //Get User By id
    @QueryMapping(name = "getUser")
    public User getUserById(@Argument Integer userId){
        return userService.getUserById(userId);
    }

    //Delete User By Id
    @MutationMapping(name = "deleteUser")
    public boolean deleteUserById(@Argument  Integer userId){
        return userService.deleteUser(userId);
    }
}
