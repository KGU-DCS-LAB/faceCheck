package com.dcs.faceCheckserver.record;

import com.dcs.faceCheckserver.record.data.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {
    List<Record> findByEmployeeIsNotNull();

    List<Record> findByVisitorIsNotNull();
}
