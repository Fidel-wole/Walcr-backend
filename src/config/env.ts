/* eslint-disable prettier/prettier */
import { config } from 'dotenv';
config();
export const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DB,
  JWT_SECRET,
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  BASE_URL,
  PAYSTACK_SECRET_KEY
} = process.env;
