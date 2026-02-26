package com.rurallportal.learningportal.service;

import com.rurallportal.learningportal.entity.Quiz;
import com.rurallportal.learningportal.repository.QuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizRepo quizRepository;

    public Quiz addQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public List<Quiz> getQuizzesByCourse(Long courseId) {
        return quizRepository.findByCourseId(courseId);
    }
}
