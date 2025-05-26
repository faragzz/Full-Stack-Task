import express from 'express';
import { getApartments, getApartmentById, createApartment } from '../controllers/apartment.controller';

const router = express.Router();

router.get('/', getApartments);
router.get('/id/:id', getApartmentById);
router.post('/', createApartment);

export default router;
