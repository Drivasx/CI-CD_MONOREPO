package com.davidrivas.tasksapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "task_title", length = Integer.MAX_VALUE, unique = true)
    private String taskTitle;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    @ColumnDefault("CURRENT_DATE")
    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDate createdAt;

    @Column(name = "deadline")
    private LocalDate deadline;

}