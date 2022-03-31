import os
from time import perf_counter
from cloaking_deserializer import CloakingDeserializer
from kafka import KafkaConsumer, TopicPartition

def run_fraud_detection_etl():  
  processing_start_time = perf_counter()
  
  kafka_bootstrap_server = os.environ.get('KAFKA_BOOTSTRAP_SERVER', 'localhost:9092')
  policy_decision_url = os.environ.get('POLICY_DECISION_URL', 'http://localhost:8181/v1/data/frauddetection/input_is_cloaked')
  topic_name = os.environ.get('TOPIC_NAME', 'BIAN.frauddetection.evaluationassessments')

  value_deserializer = CloakingDeserializer(policy_decision_url)
  kafka_consumer = KafkaConsumer(topic_name, bootstrap_servers=kafka_bootstrap_server, group_id='marketing_platform_etl', auto_offset_reset='earliest', value_deserializer=value_deserializer.loads)

  fraud_detection_evaluation_assessments_topic_partitions = [TopicPartition('BIAN.frauddetection.evaluationassessments', i) for i in kafka_consumer.partitions_for_topic('BIAN.frauddetection.evaluationassessments')]
  end_offsets_at_start_of_batch_job = [topic_partition_offset_value - 1 for topic_partition_offset_value in kafka_consumer.end_offsets(fraud_detection_evaluation_assessments_topic_partitions).values()]
  consumer_exceeded_start_offset_for_partition = [False for _ in end_offsets_at_start_of_batch_job]

  total_messages_processed = 0
  arrangements_with_fraud_detected = []

  for msg in kafka_consumer:
    total_messages_processed += 1

    if(not msg.value['is_cloaked'] and input_data_contains_fraud_detected(msg.value['data'])):
      arrangements_with_fraud_detected.append(msg.value['data']['transactionReference']['arrangementId'])

    if(msg.offset >= end_offsets_at_start_of_batch_job[msg.partition]):
      consumer_exceeded_start_offset_for_partition[msg.partition] = True

    if(all(consumer_exceeded_start_offset_for_partition)): 
      break

  kafka_consumer.close()
  final_arrangements_with_fraud_detected = set(arrangements_with_fraud_detected)
  processing_end_time = perf_counter()
  total_processing_time = processing_end_time - processing_start_time
  avg_processing_time_ms = (total_processing_time / total_messages_processed) * 1000

  print('--- Marketing Fraud Detection Evaluation Assessments ETL Summary ---'.format(total_messages_processed))
  print('Processed a total of {0} messages from Kafka in {1:0.4f} seconds.'.format(total_messages_processed, total_processing_time))
  print('Average processing time per message was {0:0.4f} milliseconds per message.'.format(avg_processing_time_ms))
  print('Fraud detected in the following {0} arrangements {1}.'.format(len(final_arrangements_with_fraud_detected), final_arrangements_with_fraud_detected))
  print('Data successfuly sent to marketing platform.')

def input_data_contains_fraud_detected(input):
  for decision in input['ruleSetsAndDecisionTreeInstances']:
    if(decision['workProduct'] == 'STD_TXN_ASSESSMENT' and decision['testResult'] == 'DETECTED'):
      return True
  return False

if __name__ == '__main__':
  run_fraud_detection_etl()