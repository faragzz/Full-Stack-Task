import {faker} from '@faker-js/faker';
import {CreateApartmentDto} from "../dto/createApartmentDto";
import {CreateApartmentDetailsDto} from "../dto/createApartmentDetailsDto";

export function generateFakeApartments(length: number): CreateApartmentDto[] {
    const apartment: CreateApartmentDto[] = [];
    for (let i = 0; i < length; i++) {
        const details: CreateApartmentDetailsDto = {
            noBedRooms: faker.number.int({min: 1, max: 5}),
            noBathrooms: faker.number.int({min: 1, max: 4}),
            area: faker.number.int({min: 40, max: 250}),
            policies: faker.helpers.arrayElement([
                'Pets allowed',
                'No smoking',
                'Smoking allowed',
                'No loud music after 10 PM'
            ]),
            additionalNotes: faker.lorem.sentence(),
        };

        const apartmentData: CreateApartmentDto = {
            unitName: faker.location.street(),
            unitNumber: i.toString(),
            project: faker.company.name(),
            description: faker.lorem.paragraph(),
            price: parseFloat(faker.commerce.price({min: 10000, max: 500000, dec: 2})),
            images: Array.from({length: 3}, () => faker.image.urlPicsumPhotos()),
            details,
        };
        apartment.push(apartmentData);
    }

    return apartment;
}
