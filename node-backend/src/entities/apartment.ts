import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from 'typeorm';
import {ApartmentDetails} from "./apartmentDetails";

@Entity()
export class Apartment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    unitName: string;

    @Column()
    unitNumber: string;

    @Column()
    project: string;

    @Column({ nullable: true })
    description: string;

    @Column('decimal')
    price: number;

    @Column("text", { array: true, nullable: true })
    images: string[];

    @OneToOne(() => ApartmentDetails, details => details.apartment, { cascade: true })
    details: ApartmentDetails;

}
