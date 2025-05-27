"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apartment_controller_1 = require("../controllers/apartment.controller");
const router = express_1.default.Router();
router.get('/', apartment_controller_1.getApartments);
router.get('/id/:id', apartment_controller_1.getApartmentById);
router.get('/search', apartment_controller_1.searchApartments);
router.post('/create', apartment_controller_1.createApartment);
router.delete('/deleteById/:id', apartment_controller_1.deleteApartmentById);
router.delete('/deleteAll', apartment_controller_1.deleteAllApartments);
router.post('/create/test', apartment_controller_1.createApartmentTestData);
exports.default = router;
