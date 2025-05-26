import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateApartmentDetailsDto {
    @IsNumber()
    @IsNotEmpty({ message: 'noBedRooms is required' })
    noBedRooms: number;

    @IsNumber()
    @IsNotEmpty({ message: 'noBathrooms is required' })
    noBathrooms: number;

    @IsNumber()
    @IsNotEmpty({ message: 'area is required' })
    area: number;

    @IsOptional()
    @IsString()
    policies?: string;

    @IsOptional()
    @IsString()
    additionalNotes?: string;
}
