package com.rurallportal.learningportal.controller;

import com.rurallportal.learningportal.entity.Course;
import com.rurallportal.learningportal.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/add")
    public Course addCourse(@RequestBody Course course) {
        return courseService.createCourse(course);
    }

    @GetMapping("/language/{lang}")
    public List<Course> getCourses(@PathVariable String lang) {
        return courseService.getCoursesByLanguage(lang);
    }
}
