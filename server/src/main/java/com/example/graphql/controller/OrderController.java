package com.example.graphql.controller;

import com.example.graphql.model.Order;
import com.example.graphql.model.User;
import com.example.graphql.service.OrderService;
import com.example.graphql.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    //Create Order
    @MutationMapping
    public Order createOrder(@Argument String orderDetails, @Argument String address ,@Argument Integer price, @Argument Integer userId){
        Order order = new Order();
        User user = userService.getUserById(userId);
        order.setOrderDetails(orderDetails);
        order.setAddress(address);
        order.setPrice(price);
        order.setUser(user);
        return orderService.createOrder(order);
    }

    //get all orders
    @QueryMapping(name = "getOrders")
    public List<Order> getAllOrders(){
        return orderService.getAllOrders();
    }

    //get order by order id
    @QueryMapping(name = "getOrder")
    public Order getOrderById(@Argument  Integer orderId){
        return orderService.getOrderById(orderId);
    }

    //delete order by id
    @MutationMapping(name="deleteOrder")
    public boolean deleteOrderById(@Argument Integer orderId){
        return orderService.deleteOrderById(orderId);
    }
}
