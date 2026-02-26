package com.rurallportal.learningportal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "progress")
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User student;

    @ManyToOne
    private Course course;

    private int completedQuizzes;

    public Progress() {}

    public Progress(User student, Course course, int completedQuizzes) {
        this.student = student;
        this.course = course;
        this.completedQuizzes = completedQuizzes;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }

    public int getCompletedQuizzes() { return completedQuizzes; }
    public void setCompletedQuizzes(int completedQuizzes) { this.completedQuizzes = completedQuizzes; }
}