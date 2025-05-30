import app from './app';
import { connectDB } from './database';
import "reflect-metadata";

const PORT = process.env.PORT || 3002;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to database:', err);
});
