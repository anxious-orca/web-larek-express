import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const config = {
  port: Number(process.env.PORT) || 3000,
  dbAdress: required('DB_ADDRESS')
};
