import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export const authentication = (salt: string, password: string): string => {
  const secret = process.env.SECRET as string;

  // Ensure all the values are valid and not undefined
  if (!salt || !password || !secret) {
    throw new Error('Missing required values: salt, password, or secret');
  }

  const hmacData = [salt, password].join('-');

  return crypto
    .createHmac('sha256', hmacData)
    .update(secret)
    .digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');