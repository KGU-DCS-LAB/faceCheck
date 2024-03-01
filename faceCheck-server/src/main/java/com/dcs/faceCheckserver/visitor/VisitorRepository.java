package com.dcs.faceCheckserver.visitor;

import com.dcs.faceCheckserver.visitor.data.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    List<Visitor> findByState(String state);

    Visitor findByNumber(String number);

    boolean existsByNumber(String memberId);

    Optional<Visitor> findByVisitorId(String username);
}
