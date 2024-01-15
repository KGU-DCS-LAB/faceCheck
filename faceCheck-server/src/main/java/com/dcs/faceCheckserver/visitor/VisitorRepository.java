package com.dcs.faceCheckserver.visitor;

import com.dcs.faceCheckserver.visitor.data.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    List<Visitor> findByState(String state);
}
