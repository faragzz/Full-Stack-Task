"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllApartments = exports.deleteApartmentById = exports.searchApartments = exports.createApartmentTestData = exports.createApartment = exports.getApartmentById = exports.getApartments = void 0;
const class_transformer_1 = require("class-transformer");
const createApartmentDto_1 = require("../dto/createApartmentDto");
const class_validator_1 = require("class-validator");
const apartmentIdDto_1 = require("../dto/apartmentIdDto");
const errorHandling_1 = __importDefault(require("../errorHandling"));
const apartmentService_1 = __importDefault(require("../services/apartmentService"));
const generateTestApartments_1 = require("../mocks/generateTestApartments");
/**
 * @swagger
 * /apartments:
 *   get:
 *     summary: Get all apartments
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of apartments
 */
const getApartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = yield apartmentService_1.default.getApartments(page, limit);
    if (result.status === 'error') {
        return res.status(500).json(result);
    }
    return res.json(result);
});
exports.getApartments = getApartments;
/**
 * @swagger
 * /apartments/id/{id}:
 *   get:
 *     summary: Get an apartment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Apartment ID
 *     responses:
 *       200:
 *         description: Apartment details
 *       400:
 *         description: Validation error
 *       404:
 *         description: Apartment not found
 */
const getApartmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const apartmentIdDto = (0, class_transformer_1.plainToInstance)(apartmentIdDto_1.ApartmentIdDto, req.params);
    const errors = yield (0, class_validator_1.validate)(apartmentIdDto);
    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: (0, errorHandling_1.default)(errors),
        });
    }
    const result = yield apartmentService_1.default.getApartmentById(Number(apartmentIdDto.id));
    if (result.status === 'error') {
        if ((_a = result.message) === null || _a === void 0 ? void 0 : _a.includes('not found')) {
            return res.status(404).json(result);
        }
        return res.status(500).json(result);
    }
    return res.json(result);
});
exports.getApartmentById = getApartmentById;
/**
 * @swagger
 * /apartments/create:
 *   post:
 *     summary: Create a new apartment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateApartmentDto'
 *     responses:
 *       201:
 *         description: Apartment created successfully
 *       400:
 *         description: Validation failed
 */
const createApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createApartmentDto = (0, class_transformer_1.plainToInstance)(createApartmentDto_1.CreateApartmentDto, req.body);
    const errors = yield (0, class_validator_1.validate)(createApartmentDto);
    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: (0, errorHandling_1.default)(errors),
        });
    }
    const result = yield apartmentService_1.default.createApartment(createApartmentDto);
    if (result.status === 'error') {
        return res.status(500).json(result);
    }
    return res.status(201).json(result);
});
exports.createApartment = createApartment;
/**
 * @swagger
 * /apartments/create/test:
 *   post:
 *     summary: Create multiple fake apartments for testing
 *     parameters:
 *       - in: query
 *         name: length
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of fake apartments to create
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Apartments created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateApartmentDto'
 *       400:
 *         description: Validation failed
 */
const createApartmentTestData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const length = Number(req.query.length);
    const apartments = (0, generateTestApartments_1.generateFakeApartments)(length || 10);
    for (const apartment of apartments) {
        yield apartmentService_1.default.createApartment(apartment);
    }
    return res.status(201).json(apartments);
});
exports.createApartmentTestData = createApartmentTestData;
/**
 * @swagger
 * /apartments/search:
 *   get:
 *     summary: Search for apartments by filters
 *     parameters:
 *       - in: query
 *         name: unitName
 *         schema:
 *           type: string
 *         description: Unit name
 *       - in: query
 *         name: unitNumber
 *         schema:
 *           type: string
 *         description: Unit number
 *       - in: query
 *         name: project
 *         schema:
 *           type: string
 *         description: Project name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Filtered list of apartments
 */
const searchApartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {
        unitName: req.query.unitName,
        unitNumber: req.query.unitNumber,
        project: req.query.project,
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
    };
    const result = yield apartmentService_1.default.searchApartments(filters);
    if (result.status === 'error') {
        return res.status(500).json(result);
    }
    return res.json(result);
});
exports.searchApartments = searchApartments;
/**
 * @swagger
 * /apartments/deleteById/{id}:
 *   delete:
 *     summary: Delete an apartment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Apartment ID to delete
 *     responses:
 *       200:
 *         description: Apartment deleted successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Apartment not found
 */
const deleteApartmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const apartmentIdDto = (0, class_transformer_1.plainToInstance)(apartmentIdDto_1.ApartmentIdDto, req.params);
    const errors = yield (0, class_validator_1.validate)(apartmentIdDto);
    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: (0, errorHandling_1.default)(errors),
        });
    }
    const result = yield apartmentService_1.default.deleteApartmentById(Number(apartmentIdDto.id));
    if (result.status === 'error') {
        if ((_a = result.message) === null || _a === void 0 ? void 0 : _a.includes('not found')) {
            return res.status(404).json(result);
        }
        return res.status(500).json(result);
    }
    return res.json(result);
});
exports.deleteApartmentById = deleteApartmentById;
/**
 * @swagger
 * /apartments/deleteAll:
 *   delete:
 *     summary: Delete all apartments
 *     responses:
 *       200:
 *         description: All apartments deleted successfully
 *       500:
 *         description: Internal server error
 */
const deleteAllApartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield apartmentService_1.default.deleteAllApartments();
    if (result.status === 'error') {
        return res.status(500).json(result);
    }
    return res.json(result);
});
exports.deleteAllApartments = deleteAllApartments;
