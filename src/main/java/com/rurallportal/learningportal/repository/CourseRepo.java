package com.rurallportal.learningportal.repository;

import com.rurallportal.learningportal.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepo extends JpaRepository<Course, Long> {
    List<Course> findByLanguage(String language);
}
