import express from "express";
import healthRouter from "./health/index.js";
import cors from "cors";
import { corsOptions } from "./config/cors.js";

const app = express();

app.use((req, _, next) => {
  console.info(new Date().toISOString().slice(11, 19), req.method, req.path);
  next();
});

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", healthRouter);

app.use((_, res) => {
  res.status(404).send({ message: "route not found" });
});

export default app;
