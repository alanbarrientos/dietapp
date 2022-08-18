package com.example.springbootdieta.dao;

import com.example.springbootdieta.model.Role;
import com.example.springbootdieta.model.RoleList;
import com.example.springbootdieta.model.User;
import com.example.springbootdieta.model.Weight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WeightRepository extends JpaRepository<Weight, Integer> {
  List<Weight> findAllByUser_UserName(String username);
}
