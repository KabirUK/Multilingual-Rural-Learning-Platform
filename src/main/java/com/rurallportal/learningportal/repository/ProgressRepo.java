package com.rurallportal.learningportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rurallportal.learningportal.entity.Progress;

public interface ProgressRepo extends JpaRepository<Progress,Long>{
	List<Progress> findByStudentId(Long studentId);
}
