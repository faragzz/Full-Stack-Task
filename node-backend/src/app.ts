import express from 'express';
import apartmentRoutes from './routes/apartment.routes';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Apartment Backend API',
            version: '1.0.0',
            description: 'API documentation for the Apartment Listing Backend',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/controllers/*.ts', './src/dto/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/apartments', apartmentRoutes);
export default app;
