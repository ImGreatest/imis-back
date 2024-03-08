import 'dotenv/config';

export const config = Object.freeze({
  LogLevel: process.env.LOG_LEVEL,
  PortMath: process.env.PORT_MATH ?? 3001,
  PortCabinet: process.env.PORT_CAB ?? 3000,
  HashSaltRound: process.env.HASH_SALT_ROUND,
  JwtSecret: process.env.JWT_SECRET,
  JwtExpiresIn: process.env.JWT_EXPIRES_IN,
});
