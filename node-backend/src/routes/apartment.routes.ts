import express from 'express';
import {getApartments, getApartmentById, createApartment, searchApartments} from '../controllers/apartment.controller';

const router = express.Router();

router.get('/', getApartments);
router.get('/id/:id', getApartmentById);
router.get('/search', searchApartments);
router.post('/create', createApartment);

export default router;
