import {Request, Response} from 'express';
import {plainToInstance} from "class-transformer";
import {CreateApartmentDto} from "../dto/createApartmentDto";
import {validate} from "class-validator";
import {ApartmentIdDto} from "../dto/apartmentIdDto";
import formatValidationErrors from "../errorHandling";
import apartmentService from "../services/apartmentService";

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
export const getApartments = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await apartmentService.getApartments(page, limit);

    if (result.status === 'error') {
        return res.status(500).json(result);
    }

    return res.json(result);
};

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
export const getApartmentById = async (req: Request, res: Response) => {
    const apartmentIdDto = plainToInstance(ApartmentIdDto, req.params);
    const errors = await validate(apartmentIdDto);

    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: formatValidationErrors(errors),
        });
    }

    const result = await apartmentService.getApartmentById(Number(apartmentIdDto.id));

    if (result.status === 'error') {
        if (result.message?.includes('not found')) {
            return res.status(404).json(result);
        }
        return res.status(500).json(result);
    }

    return res.json(result);
};

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
export const createApartment = async (req: Request, res: Response) => {
    const createApartmentDto = plainToInstance(CreateApartmentDto, req.body);
    const errors = await validate(createApartmentDto);

    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: formatValidationErrors(errors),
        });
    }

    const result = await apartmentService.createApartment(createApartmentDto);

    if (result.status === 'error') {
        return res.status(500).json(result);
    }

    return res.status(201).json(result);
};

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
 *     responses:
 *       200:
 *         description: Filtered list of apartments
 */
export const searchApartments = async (req: Request, res: Response) => {
    const filters = {
        unitName: req.query.unitName as string,
        unitNumber: req.query.unitNumber as string,
        project: req.query.project as string,
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
    };

    const result = await apartmentService.searchApartments(filters);

    if (result.status === 'error') {
        return res.status(500).json(result);
    }

    return res.json(result);
};


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
export const deleteApartmentById = async (req: Request, res: Response) => {
    const apartmentIdDto = plainToInstance(ApartmentIdDto, req.params);
    const errors = await validate(apartmentIdDto);

    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: formatValidationErrors(errors),
        });
    }

    const result = await apartmentService.deleteApartmentById(Number(apartmentIdDto.id));

    if (result.status === 'error') {
        if (result.message?.includes('not found')) {
            return res.status(404).json(result);
        }
        return res.status(500).json(result);
    }

    return res.json(result);
};


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
export const deleteAllApartments = async (req: Request, res: Response) => {
    const result = await apartmentService.deleteAllApartments();

    if (result.status === 'error') {
        return res.status(500).json(result);
    }

    return res.json(result);
};
