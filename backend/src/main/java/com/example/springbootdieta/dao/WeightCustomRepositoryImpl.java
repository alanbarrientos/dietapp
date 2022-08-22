package com.example.springbootdieta.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class WeightCustomRepositoryImpl implements WeightCustomRepository {
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public Integer getCount(String username) {
//        List<Integer> userList = entityManager.createQuery("SELECT COUNT FROM weight ").getResultList();
        return 1;
    }
}
