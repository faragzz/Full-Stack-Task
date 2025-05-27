"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeApartments = generateFakeApartments;
const faker_1 = require("@faker-js/faker");
function generateFakeApartments(length) {
    const apartment = [];
    for (let i = 0; i < length; i++) {
        const details = {
            noBedRooms: faker_1.faker.number.int({ min: 1, max: 5 }),
            noBathrooms: faker_1.faker.number.int({ min: 1, max: 4 }),
            area: faker_1.faker.number.int({ min: 40, max: 250 }),
            policies: faker_1.faker.helpers.arrayElement([
                'Pets allowed',
                'No smoking',
                'Smoking allowed',
                'No loud music after 10 PM'
            ]),
            additionalNotes: faker_1.faker.lorem.sentence(),
        };
        const apartmentData = {
            unitName: faker_1.faker.location.street(),
            unitNumber: i.toString(),
            project: faker_1.faker.company.name(),
            description: faker_1.faker.lorem.paragraph(),
            price: Math.round(parseFloat(faker_1.faker.commerce.price({ min: 800000, max: 20000000 }))),
            images: Array.from({ length: 3 }, () => faker_1.faker.image.urlPicsumPhotos()),
            details,
        };
        apartment.push(apartmentData);
    }
    return apartment;
}
