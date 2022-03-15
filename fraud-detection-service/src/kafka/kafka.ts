import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'fraud-detection-service',
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
});

export default kafka;
