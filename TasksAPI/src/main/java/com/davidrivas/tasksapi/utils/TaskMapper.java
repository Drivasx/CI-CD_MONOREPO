package com.davidrivas.tasksapi.utils;

import com.davidrivas.tasksapi.dto.TaskRequest;
import com.davidrivas.tasksapi.dto.TaskResponse;
import com.davidrivas.tasksapi.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    Task toEntity(TaskRequest taskRequest);

    @Mapping(target = "createdAt", source = "createdAt")
    TaskResponse toResponse(Task task);

}
