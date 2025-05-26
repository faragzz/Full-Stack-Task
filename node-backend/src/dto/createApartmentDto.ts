import {
    IsString,
    IsNumber,
    IsOptional,
    IsArray,
    ValidateNested,
    IsNotEmpty,
    IsDefined
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateApartmentDetailsDto } from './createApartmentDetailsDto';

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

    @IsNumber({ maxDecimalPlaces: 2 })
    price: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @IsDefined({ message: 'details must be provided' })
    @IsNotEmpty({ message: 'details cannot be empty' })
    @ValidateNested()
    @Type(() => CreateApartmentDetailsDto)
    details: CreateApartmentDetailsDto;
}
