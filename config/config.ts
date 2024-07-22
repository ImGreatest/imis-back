import 'dotenv/config';
import * as process from "node:process";

export const config = Object.freeze({
  LogLevel: process.env.LOG_LEVEL,
  PortMobile: process.env.PORT_MOBILE ?? 3003,
  PortEmployer: process.env.PORT_EMPLOYER ?? 3002,
  PortRating: process.env.PORT_RATING ?? 3001,
  PortCabinet: process.env.PORT_CAB ?? 3000,
  HashSaltRound: Number(process.env.HASH_SALT_ROUND),
  JwtSecret: process.env.JWT_SECRET,
  JwtExpiresIn: process.env.JWT_EXPIRES_IN,
  RefreshLength: 64,
  JwtLifeTime: 9000,
  TokenCoolDown: 600,
});

export const emailConfig = Object.freeze({
  EmailFrom: process.env.EMAIL_FROM,
  EmailPass: process.env.EMAIL_PASS,
});
