import {Request, Response} from 'express';
import {AppDataSource} from '../../ormconfig';
import {Apartment} from '../entities/apartment';
import {plainToInstance} from "class-transformer";
import {CreateApartmentDto} from "../dto/createApartmentDto";
import {validate} from "class-validator";
import {ApartmentIdDto} from "../dto/apartmentIdDto";
import formatValidationErrors from "../errorHandling";

const apartmentRepo = AppDataSource.getRepository(Apartment);

export const getApartments = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
        const skip = (page - 1) * limit;

        const [apartments, total] = await apartmentRepo.findAndCount({
            skip,
            take: limit,
            relations: ['details'],
        });
        res.json({
            data: apartments,
            total,
            page,
            last_page: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error('Error fetching apartments with pagination:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


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

    const apartment = await apartmentRepo.findOne({
        where: {id: Number(req.params.id)},
        relations: ['details'],
    });
    if (!apartment) {
        return res.status(404).json({
            status: 'error',
            message: `Apartment with id ${apartmentIdDto.id} not found`,
        });
    }

    return res.json({
        status: 'success',
        data: apartment,
    });
};

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

    try {
        const apartment = apartmentRepo.create(createApartmentDto);
        await apartmentRepo.save(apartment);

        return res.status(201).json({
            status: 'success',
            data: apartment,
        });
    } catch (error) {
        console.error('Error creating apartment:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};
