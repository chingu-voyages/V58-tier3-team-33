export const ENV = {
  database: {
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
  },
  server: {
    PORT: process.env.PORT,
  },
  cors: {
    CORS_ORIGIN: process.env.CORS_ORIGIN,
  },
};
