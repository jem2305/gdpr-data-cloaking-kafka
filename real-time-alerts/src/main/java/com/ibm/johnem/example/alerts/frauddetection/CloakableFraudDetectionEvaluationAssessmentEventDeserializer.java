package com.ibm.johnem.example.alerts.frauddetection;

import com.ibm.johnem.example.cloaking.CloakingDeserializer;
import com.ibm.johnem.example.schemagen.FraudDetectionEvaluationAssessmentSchema;

public class CloakableFraudDetectionEvaluationAssessmentEventDeserializer extends CloakingDeserializer<CloakableFraudDetectionEvaluationAssessmentEvent, FraudDetectionEvaluationAssessmentSchema> {

    public CloakableFraudDetectionEvaluationAssessmentEventDeserializer() {
        super(CloakableFraudDetectionEvaluationAssessmentEvent.class);
    }
    
}
