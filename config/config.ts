import 'dotenv/config';

export const config = Object.freeze({
  LogLevel: process.env.LOG_LEVEL,
  PortAdmin: process.env.PORT_ADMIN ?? 3001,
  HashSaltRound: process.env.HASH_SALT_ROUND,
  JwtSecret: process.env.JWT_SECRET,
});
