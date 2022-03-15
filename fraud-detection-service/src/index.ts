import 'dotenv/config';
import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import MockProducer from './producer/mockProducer';
import kafka from './kafka/kafka';
import MockProducerDriver from './producer/mockProducerDriver';

const app = express();
const port = 8080; // default port to listen

const logConfiguration = {
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
};
const logger = winston.createLogger(logConfiguration);
app.use(expressWinston.logger(logConfiguration));

// define a route handler for the default home page
app.get('/', (_req, res) => {
  res.send('Hello world!');
});

// start the Express server
app.listen(port, () => {
  logger.info(`server started at http://localhost:${port}`);
});

// start mock producer
const topic = process.env.TOPIC;
const mockProducer = new MockProducer(kafka, topic);
const driver = new MockProducerDriver(mockProducer);
driver.start();
