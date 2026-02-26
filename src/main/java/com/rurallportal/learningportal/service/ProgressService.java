package com.rurallportal.learningportal.service;

import com.rurallportal.learningportal.entity.Progress;
import com.rurallportal.learningportal.repository.ProgressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepo progressRepository;

    public Progress updateProgress(Progress progress) {
        return progressRepository.save(progress);
    }

    public List<Progress> getStudentProgress(Long studentId) {
        return progressRepository.findByStudentId(studentId);
    }
}