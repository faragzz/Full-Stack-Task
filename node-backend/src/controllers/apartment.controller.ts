import { Request, Response } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Apartment } from '../entities/apartment';
import {plainToInstance} from "class-transformer";
import {CreateApartmentDto} from "../dto/createApartmentDto";
import {validate} from "class-validator";

const apartmentRepo = AppDataSource.getRepository(Apartment);

export const getApartments = async (_req: Request, res: Response) => {
    const apartments = await apartmentRepo.find();
    res.json(apartments);
};

export const getApartmentById = async (req: Request, res: Response) => {
    const apartment = await apartmentRepo.findOne({
        where: { id: Number(req.params.id) },
        relations: ['details'],
    });
    if (!apartment) return res.status(404).json({ message: 'Not found' });
    res.json(apartment);
};

export const createApartment = async (req: Request, res: Response) => {
    const createApartmentDto = plainToInstance(CreateApartmentDto, req.body);

    const errors = await validate(createApartmentDto);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const apartment = apartmentRepo.create(createApartmentDto);
    await apartmentRepo.save(apartment);
    res.status(201).json(apartment);
};
