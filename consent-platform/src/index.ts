import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';

const app = express();
const port = 3000;

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

app.use(express.static('bundles'));

// define a route handler for the default home page
app.get('/', (_req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  logger.info(`Consent platform mock listening on ${port}`);
});
