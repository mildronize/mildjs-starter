import path from 'path';
import dotenvSafe from 'dotenv-safe';

// import .env variables
dotenvSafe.config({
  path: path.join(__dirname, '../../../.env'),
  sample: path.join(__dirname, '../../../.env.example'),
});

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: Number(process.env.JWT_EXPIRATION_MINUTES),
  mongo: {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  //   emailConfig: {
  //     host: process.env.EMAIL_HOST,
  //     port: process.env.EMAIL_PORT,
  //     username: process.env.EMAIL_USERNAME,
  //     password: process.env.EMAIL_PASSWORD,
  //   },
};
