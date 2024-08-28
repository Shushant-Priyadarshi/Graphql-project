package com.example.graphql.service;

import com.example.graphql.helper.ExceptionHandler;
import com.example.graphql.model.Order;
import com.example.graphql.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    //Create Order
    public Order createOrder(Order order){
        return orderRepo.save(order);
    }

    //get all orders
    public List<Order> getAllOrders(){
        return orderRepo.findAll();
    }

    //get by id
    public Order getOrderById(Integer orderId){
        return orderRepo.findById(orderId).orElseThrow(ExceptionHandler::throwResourceNotFoundException);
    }

    //deleteBy id

    public boolean deleteOrderById(Integer orderId){
        Order order =getOrderById(orderId);
        orderRepo.delete(order);
        return true;
    }


}

