/**
 * @swagger
 * components:
 *   schemas:
 *     CreateApartmentDto:
 *       type: object
 *       required:
 *         - unitName
 *         - unitNumber
 *         - project
 *         - price
 *         - details
 *       properties:
 *         unitName:
 *           type: string
 *           description: The name of the apartment unit
 *         unitNumber:
 *           type: string
 *           description: The apartment unit number
 *         project:
 *           type: string
 *           description: The project or building name
 *         description:
 *           type: string
 *           description: Optional description of the apartment
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the apartment (max 2 decimal places)
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Optional array of image URLs
 *         details:
 *           $ref: '#/components/schemas/CreateApartmentDetailsDto'
 */

import 'reflect-metadata';
import {
    IsString,
    IsNumber,
    IsOptional,
    IsArray,
    ValidateNested,
    IsNotEmpty,
    IsDefined
} from 'class-validator';
import {Type} from 'class-transformer';
import {CreateApartmentDetailsDto} from './createApartmentDetailsDto';

export class CreateApartmentDto {
    @IsString()
    unitName: string;

    @IsString()
    unitNumber: string;

    @IsString()
    project: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber({maxDecimalPlaces: 2})
    price: number;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    images?: string[];

    @IsDefined({message: 'details must be provided'})
    @IsNotEmpty({message: 'details cannot be empty'})
    @ValidateNested()
    @Type(() => CreateApartmentDetailsDto)
    details: CreateApartmentDetailsDto;
}
