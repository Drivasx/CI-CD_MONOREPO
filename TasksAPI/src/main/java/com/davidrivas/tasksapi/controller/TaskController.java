package com.davidrivas.tasksapi.controller;

import com.davidrivas.tasksapi.dto.TaskRequest;
import com.davidrivas.tasksapi.dto.TaskResponse;
import com.davidrivas.tasksapi.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAll(){
        if(taskService.getAll() == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(taskService.getAll());
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@RequestBody TaskRequest taskRequest){
        if(taskService.createTask(taskRequest) == null) return new ResponseEntity<>(HttpStatus.CONFLICT);

        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(taskRequest));
    }
}
