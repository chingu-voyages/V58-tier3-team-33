export const ENV = {
  cors: {
    CORS_ORIGIN: getEnvOrPanic("CORS_ORIGIN"),
  },
  database: {
    DB_CONNECTION_STRING: getEnvOrPanic("DB_CONNECTION_STRING"),
  },
  server: {
    ORIGIN: getEnvOrPanic("ORIGIN"),
    PORT: getEnvOrPanic("PORT", true),
  },
  auth: {
    PASSWORD_PEPPER: getEnvOrPanic("PASSWORD_PEPPER"),
  },
};

// TODO: can replace with zod validation
function getEnvOrPanic(key: string, allowEmptyString = false) {
  if (
    !allowEmptyString &&
    (!Object.hasOwn(process.env, key) || !process.env[key])
  ) {
    throw new Error(`> ${key} not set, check your env vars`, {
      cause: { [key]: process.env[key] },
    });
  }

  return process.env[key] ?? "";
}
