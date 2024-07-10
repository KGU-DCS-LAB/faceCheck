package com.dcs.faceCheckserver.record;

import com.dcs.faceCheckserver.record.data.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Long> {
}
