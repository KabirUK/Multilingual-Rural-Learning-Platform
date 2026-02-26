package com.rurallportal.learningportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rurallportal.learningportal.entity.Quiz;

public interface QuizRepo extends JpaRepository<Quiz,Long>{
	List<Quiz> findByCourseId(Long courseId);
}
