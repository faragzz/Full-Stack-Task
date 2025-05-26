import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Apartment } from './apartment';

@Entity()
export class ApartmentDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Apartment, apartment => apartment.details, { onDelete: 'CASCADE' })
    @JoinColumn()
    apartment: Apartment;

    @Column({ nullable: true })
    amenities: string;

    @Column({ nullable: true })
    floorPlanUrl: string;

    @Column({ nullable: true })
    policies: string;

    @Column({ nullable: true })
    additionalNotes: string;
}
