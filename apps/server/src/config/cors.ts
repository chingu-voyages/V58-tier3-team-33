import { ENV } from "./env.js";

const origin = ENV.cors.CORS_ORIGIN;

export const corsOptions = {
  origin,
  methods: ["GET", "POST", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
