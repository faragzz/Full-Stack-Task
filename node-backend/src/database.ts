import { AppDataSource } from '../ormconfig';

export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Connected to PostgreSQL');
    } catch (err) {
        console.error('Error connecting to the database', err);
    }
};
