import { faker } from '@faker-js/faker';
import { FraudDetectionEvaluationAssessment } from '../types/fraud_detection_evaluation_assessment.schema';

export default class FraudDetectionEvaluationAssessmentMessageGenerator {
  static generate(): FraudDetectionEvaluationAssessment {
    return {
      id: faker.datatype.uuid(),
      ruleSetsAndDecisionTreeInstances: [{
        testResult: faker.random.arrayElement(['DETECTED', 'NOT_FOUND', 'NOT_FOUND', 'NOT_FOUND', 'NOT_FOUND']),
        workProduct: 'STD_TXN_ASSESSMENT',
      }],
      transactionReference: {
        transactionId: faker.datatype.uuid(),
        arrangementId: faker.datatype.number({ min: 1000000000, max: 1000000010 }),
      },
    };
  }
}
