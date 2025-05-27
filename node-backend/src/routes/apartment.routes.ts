import express from 'express';
import {
    getApartments,
    getApartmentById,
    createApartment,
    searchApartments,
    deleteApartmentById, deleteAllApartments
} from '../controllers/apartment.controller';

const router = express.Router();

router.get('/', getApartments);
router.get('/id/:id', getApartmentById);
router.get('/search', searchApartments);
router.post('/create', createApartment);
router.delete('/deleteById/:id', deleteApartmentById);
router.delete('/deleteAll', deleteAllApartments);

export default router;
