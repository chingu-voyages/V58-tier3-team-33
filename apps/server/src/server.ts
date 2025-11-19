import app from './app.js'
import { pingDb } from './database/db.js';
import { ENV } from './config/env.js';

const port = ENV.server.PORT;

app.listen(port, async () => {
    console.info(`> Listening to port ${port}`)
    await pingDb()
});
