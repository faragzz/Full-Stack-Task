import express from 'express';
import apartmentRoutes from './routes/apartment.routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/apartments', apartmentRoutes);
app.listen(3001, () => {
    console.log('Server is running on port 3000');
});
export default app;
