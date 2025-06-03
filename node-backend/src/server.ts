import app from './app';
import { connectDB } from './database';
import "reflect-metadata";

const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to database:', err);
});
