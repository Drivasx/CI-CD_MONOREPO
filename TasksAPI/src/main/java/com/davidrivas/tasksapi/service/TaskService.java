package com.davidrivas.tasksapi.service;

import com.davidrivas.tasksapi.dto.TaskRequest;
import com.davidrivas.tasksapi.dto.TaskResponse;
import com.davidrivas.tasksapi.entity.Task;
import com.davidrivas.tasksapi.repository.TaskRepository;
import com.davidrivas.tasksapi.utils.TaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskMapper taskMapper;

    public List<TaskResponse> getAll(){
        if(taskRepository.findAll().isEmpty()) return null;
        return taskRepository.findAll().stream().map(taskMapper::toResponse).collect(Collectors.toList());
    }

    public TaskResponse createTask(TaskRequest task){
        List<Task> tasks = taskRepository.findAll();
        for (Task value : tasks) {
            if (task.getTaskTitle().equals(value.getTaskTitle())) {
                return null;
            }
        }

        Task newTask = taskMapper.toEntity(task);
        return taskMapper.toResponse(taskRepository.save(newTask));
    }

    public TaskResponse updateTask(Integer id, TaskRequest task){
        Optional<Task> taskToUpdate = taskRepository.findById(id);
        if(taskToUpdate.isEmpty()){
            return null;
        }

        taskToUpdate.get().setTaskTitle(task.getTaskTitle());
        taskToUpdate.get().setDescription(task.getDescription());
        taskToUpdate.get().setDeadline(task.getDeadline());

        return taskMapper.toResponse(taskToUpdate.get());
    }

    public TaskResponse deleteTask(Integer id){
        Optional<Task> taskToDelete = taskRepository.findById(id);
        if(taskToDelete.isEmpty()) return null;

        taskRepository.delete(taskToDelete.get());
        return taskMapper.toResponse(taskToDelete.get());
    }
}
