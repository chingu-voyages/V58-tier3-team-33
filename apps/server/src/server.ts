import app from './app.js'
import { pingDb } from './database/db.js';

const port = 3000;

app.listen(port, async () => {
    console.info(`> Listening to port ${port}`)
    await pingDb()
});
