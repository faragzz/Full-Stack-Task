/**
 * @swagger
 * components:
 *   schemas:
 *     ApartmentIdDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           minimum: 1
 *       required:
 *         - id
 */
import {IsInt, Min} from 'class-validator';
import {Type} from 'class-transformer';

export class ApartmentIdDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    id: number;
}
