package com.davidrivas.tasksapi.dto;

import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Data
public class TaskResponse {
    Integer id;
    String taskTitle;
    String description;
    LocalDate createdAt;
    LocalDate deadline;
}
