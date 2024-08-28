package com.example.graphql.service;

import com.example.graphql.exception.UserAlreadyExistsException;
import com.example.graphql.helper.ExceptionHandler;
import com.example.graphql.model.User;
import com.example.graphql.repository.UserRepo;
import graphql.GraphQLError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    //Create User Service
    public User createUser(User user) throws Exception{
        User userFromDb= userRepo.findByEmail(user.getEmail());
        if(userFromDb!=null){
            throw  new UserAlreadyExistsException("USER ALREADY PRESENT!");
        }
        return  userRepo.save(user);
    }

    //Getting All Users
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    //Getting User by user id
    public User getUserById(Integer userId){
        return userRepo.findById(userId).orElseThrow(ExceptionHandler::throwResourceNotFoundException);
    }

    //Update User
    public User updateUser(User user, Integer userId) throws Exception{
        User myUser = getUserById(userId);
        if(user.getName() != null){
            myUser.setName(user.getName());
        }
        if(user.getEmail() != null){
            myUser.setEmail(user.getEmail());
        }
        if(user.getPassword() != null){
            myUser.setPassword(user.getPassword());
        }
        if(user.getPhone() != null){
            myUser.setPhone(user.getPhone());
        }
        return userRepo.save(myUser);
    }

    //Deleting User
    public boolean deleteUser(Integer userId){
        getUserById(userId);
        userRepo.deleteById(userId);
        return true;
    }


}
