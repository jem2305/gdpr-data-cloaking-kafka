import { Kafka, Producer } from 'kafkajs';
import FraudDetectionEvaluationAssessmentMessageGenerator from './fraudDetectionEvaluationAssessmentMessageGenerator';

export default class MockProducer {
  kafkaProducer: Producer;

  topic: string;

  constructor(kafka: Kafka, topic: string) {
    this.kafkaProducer = kafka.producer();
    this.topic = topic;
  }

  async produceMockFraudDetectionEvaluationAssessmentMessage(): Promise<void> {
    await this.kafkaProducer.connect();
    const randomMessage = FraudDetectionEvaluationAssessmentMessageGenerator.generate();
    this.kafkaProducer.send({
      topic: this.topic,
      messages: [{
        key: randomMessage.id,
        value: JSON.stringify(randomMessage),
      }],
    });
  }
}
