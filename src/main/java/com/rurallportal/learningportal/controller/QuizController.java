package com.rurallportal.learningportal.controller;

import com.rurallportal.learningportal.entity.Quiz;
import com.rurallportal.learningportal.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/add")
    public Quiz addQuiz(@RequestBody Quiz quiz) {
        return quizService.addQuiz(quiz);
    }

    @GetMapping("/course/{courseId}")
    public List<Quiz> getQuizzes(@PathVariable Long courseId) {
        return quizService.getQuizzesByCourse(courseId);
    }
}