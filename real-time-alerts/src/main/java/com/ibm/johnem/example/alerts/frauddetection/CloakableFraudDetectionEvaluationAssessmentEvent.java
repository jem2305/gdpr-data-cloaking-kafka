package com.ibm.johnem.example.alerts.frauddetection;

import com.ibm.johnem.example.cloaking.CloakableEvent;
import com.ibm.johnem.example.schemagen.FraudDetectionEvaluationAssessmentSchema;

import lombok.Data;

@Data
public class CloakableFraudDetectionEvaluationAssessmentEvent implements CloakableEvent<FraudDetectionEvaluationAssessmentSchema> {

    FraudDetectionEvaluationAssessmentSchema event;
    boolean isCloaked;

    @Override
    public Class<FraudDetectionEvaluationAssessmentSchema> getEventClass() {
        return FraudDetectionEvaluationAssessmentSchema.class;
    }

}
