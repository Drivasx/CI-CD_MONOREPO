package com.davidrivas.tasksapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class TaskRequest {
    String taskTitle;
    String description;
    LocalDate deadline;
}
