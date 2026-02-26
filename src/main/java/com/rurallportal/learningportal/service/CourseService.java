package com.rurallportal.learningportal.service;

import com.rurallportal.learningportal.entity.Course;
import com.rurallportal.learningportal.repository.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepo courseRepository;

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public List<Course> getCoursesByLanguage(String language) {
        return courseRepository.findByLanguage(language);
    }
}