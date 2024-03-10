import winston from 'winston';
import { utilities } from 'nest-winston';

export const winstonModuleOptions = (filename: string) => ({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.ms(),
        utilities.format.nestLike('example-app-name', {
          prettyPrint: true,
          colors: true,
        }),
      ),
      level: 'debug',
    }),
    new winston.transports.File({
      dirname: 'logs',
      filename: `${filename}.log`,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.logstash(),
      ),
      level: 'debug',
    }),
  ],
});
