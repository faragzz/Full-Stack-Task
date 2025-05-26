/**
 * @swagger
 * components:
 *   schemas:
 *     CreateApartmentDetailsDto:
 *       type: object
 *       required:
 *         - noBedRooms
 *         - noBathrooms
 *         - area
 *       properties:
 *         noBedRooms:
 *           type: number
 *           description: Number of bedrooms
 *         noBathrooms:
 *           type: number
 *           description: Number of bathrooms
 *         area:
 *           type: number
 *           description: Area in square meters
 *         policies:
 *           type: string
 *           description: Optional policies (e.g. pets allowed, smoking rules)
 *         additionalNotes:
 *           type: string
 *           description: Any additional notes or information
 */

import {IsNumber, IsOptional, IsString, IsNotEmpty} from 'class-validator';

export class CreateApartmentDetailsDto {
    @IsNumber()
    @IsNotEmpty({message: 'noBedRooms is required'})
    noBedRooms: number;

    @IsNumber()
    @IsNotEmpty({message: 'noBathrooms is required'})
    noBathrooms: number;

    @IsNumber()
    @IsNotEmpty({message: 'area is required'})
    area: number;

    @IsOptional()
    @IsString()
    policies?: string;

    @IsOptional()
    @IsString()
    additionalNotes?: string;
}
