package com.rurallportal.learningportal.controller;

import com.rurallportal.learningportal.entity.Progress;
import com.rurallportal.learningportal.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @PostMapping("/update")
    public Progress update(@RequestBody Progress progress) {
        return progressService.updateProgress(progress);
    }

    @GetMapping("/student/{studentId}")
    public List<Progress> getProgress(@PathVariable Long studentId) {
        return progressService.getStudentProgress(studentId);
    }
}