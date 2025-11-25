import app from "./app.js";
import { ENV } from "./config/env.js";
import { makeDb } from "./database/db.js";

const port = ENV.server.PORT;

app.listen(port, () => {
  console.info(`> Listening to port ${port}`);
  makeDb();
});
