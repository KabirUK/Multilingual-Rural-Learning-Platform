package com.rurallportal.learningportal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;
    private String answer;

    @ManyToOne
    private Course course;

    public Quiz() {}

    public Quiz(String question, String answer, Course course) {
        this.question = question;
        this.answer = answer;
        this.course = course;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
}
