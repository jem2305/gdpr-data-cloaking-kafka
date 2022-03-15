import MockProducer from './mockProducer';

export default class MockProducerDriver {
  producer: MockProducer;

  intervalMs: number;

  constructor(producer: MockProducer, intervalMs = 1000) {
    this.producer = producer;
    this.intervalMs = intervalMs;
  }

  start(): void {
    setInterval(async () => {
      await this.producer.produceMockFraudDetectionEvaluationAssessmentMessage();
    }, this.intervalMs);
  }
}
