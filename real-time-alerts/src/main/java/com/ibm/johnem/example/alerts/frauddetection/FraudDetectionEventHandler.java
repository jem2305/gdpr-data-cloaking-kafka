package com.ibm.johnem.example.alerts.frauddetection;

import javax.enterprise.context.ApplicationScoped;

import com.ibm.johnem.example.schemagen.FraudDetectionEvaluationAssessmentSchema;
import com.ibm.johnem.example.schemagen.RuleSetsAndDecisionTreeInstance.TestResult;
import com.ibm.johnem.example.schemagen.RuleSetsAndDecisionTreeInstance.WorkProduct;

import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.jboss.logging.Logger;

@ApplicationScoped
public class FraudDetectionEventHandler {
    
    private static final Logger LOG = Logger.getLogger(FraudDetectionEventHandler.class);

    @Incoming("fraud_detection_evaluation_assessments")
    public void handleEvaluationAssessments(CloakableFraudDetectionEvaluationAssessmentEvent possiblyCloakedEvent) {
        if(possiblyCloakedEvent.isCloaked()) {
            LOG.info("Received cloaked message " + possiblyCloakedEvent + ". Nothing to process.");
            return;
        }
        else if(possiblyCloakedEvent.getEvent() == null) {
            LOG.info("Received null event payload, nothing to process.");
            return;
        }
        else {
            checkAssessmentForDetectedFraudAndSendAlert(possiblyCloakedEvent.getEvent());
        }
    }

    private void checkAssessmentForDetectedFraudAndSendAlert(FraudDetectionEvaluationAssessmentSchema assesment) {
        boolean fraudDetected = 
            assesment.getRuleSetsAndDecisionTreeInstances()
                .stream()
                .filter(decisionInstances -> decisionInstances.getWorkProduct().equals(WorkProduct.STD_TXN_ASSESSMENT))
                .filter(decisionInstances -> decisionInstances.getTestResult().equals(TestResult.DETECTED))
                .findFirst()
                .isPresent();
        
        if(fraudDetected) {
            LOG.info("Fraud detected on transaction! Sending alert to owners of arrangement " + String.format("%10d", assesment.getTransactionReference().getArrangementId()));
        }
        else {
            LOG.info("No fraud detected on transaction " + assesment.getTransactionReference().getTransactionId());
        }      
    }
}
