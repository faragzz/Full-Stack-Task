import express from 'express';
import {
    getApartments,
    getApartmentById,
    createApartment,
    searchApartments,
    deleteApartmentById, deleteAllApartments, createApartmentTestData
} from '../controllers/apartment.controller';

const router = express.Router();

router.get('/', getApartments);
router.get('/id/:id', getApartmentById);
router.get('/search', searchApartments);
router.post('/create', createApartment);
router.delete('/deleteById/:id', deleteApartmentById);
router.delete('/deleteAll', deleteAllApartments);
router.post('/create/test', createApartmentTestData);
export default router;
