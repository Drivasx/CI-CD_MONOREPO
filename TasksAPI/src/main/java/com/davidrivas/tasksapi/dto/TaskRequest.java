package com.davidrivas.tasksapi.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {
    String taskTitle;
    String description;
    LocalDate deadline;
}
