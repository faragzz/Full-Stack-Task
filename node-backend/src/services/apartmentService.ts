import {AppDataSource} from '../../ormconfig';
import {Apartment} from '../entities/apartment';
import {CreateApartmentDto} from '../dto/createApartmentDto';

const apartmentRepo = AppDataSource.getRepository(Apartment);

/**
 * Retrieves a paginated list of apartments.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of apartments per page.
 * @returns {Promise<object>} An object containing apartment data, pagination info, and status.
 */
export const getApartments = async (page: number, limit: number) => {
    try {
        const skip = (page - 1) * limit;

        const [apartments, total] = await apartmentRepo.findAndCount({
            skip,
            take: limit,
            // relations: ['details'],
        });

        return {
            status: 'success',
            data: apartments,
            total,
            page,
            last_page: Math.ceil(total / limit),
        };
    } catch (error) {
        console.error('Error fetching apartments with pagination:', error);
        return {
            status: 'error',
            message: 'Internal server error',
        };
    }
};

/**
 * Retrieves a single apartment by its ID.
 *
 * @param {number} id - The ID of the apartment.
 * @returns {Promise<object>} The apartment data and status, or an error message if not found.
 */
export const getApartmentById = async (id: number) => {
    try {
        const apartment = await apartmentRepo.findOne({
            where: {id},
            relations: ['details'],
        });

        if (!apartment) {
            return {
                status: 'error',
                message: `Apartment with id ${id} not found`,
            };
        }

        return {
            status: 'success',
            data: apartment,
        };
    } catch (error) {
        console.error(`Error fetching apartment with id ${id}:`, error);
        return {
            status: 'error',
            message: 'Internal server error',
        };
    }
};

/**
 * Creates a new apartment entry in the database.
 *
 * @param {CreateApartmentDto} createApartmentDto - The DTO containing apartment creation data.
 * @returns {Promise<object>} The created apartment data and status.
 */
export const createApartment = async (createApartmentDto: CreateApartmentDto) => {
    try {
        const apartment = apartmentRepo.create(createApartmentDto);
        await apartmentRepo.save(apartment);

        return {
            status: 'success',
            data: apartment,
        };
    } catch (error) {
        console.error('Error creating apartment:', error);
        return {
            status: 'error',
            message: 'Internal server error',
        };
    }
};

/**
 * Searches apartments based on unit name, unit number, or project name.
 *
 * @param {Object} filters - Object containing optional filter parameters.
 * @param {string} [filters.unitName] - Filter by unit name (partial match, case-insensitive).
 * @param {string} [filters.unitNumber] - Filter by unit number (partial match, case-insensitive).
 * @param {string} [filters.project] - Filter by project name (partial match, case-insensitive).
 * @returns {Promise<object>} Filtered apartments, total count, and status.
 */
export const searchApartments = async (filters: {
    unitName?: string;
    unitNumber?: string;
    project?: string;
}) => {
    try {
        const query = apartmentRepo
            .createQueryBuilder('apartment');

        if (filters.unitName) {
            query.andWhere('LOWER(apartment.unitName) LIKE LOWER(:unitName)', {
                unitName: `%${filters.unitName}%`,
            });
        }

        if (filters.unitNumber) {
            query.andWhere('LOWER(apartment.unitNumber) LIKE LOWER(:unitNumber)', {
                unitNumber: `%${filters.unitNumber}%`,
            });
        }

        if (filters.project) {
            query.andWhere('LOWER(apartment.project) LIKE LOWER(:project)', {
                project: `%${filters.project}%`,
            });
        }

        const apartments = await query.getMany();

        return {
            status: 'success',
            data: apartments,
            total: apartments.length,
        };
    } catch (error) {
        console.error('Error searching apartments:', error);
        return {
            status: 'error',
            message: 'Internal server error',
        };
    }
};


export default {
    getApartments,
    getApartmentById,
    createApartment,
    searchApartments
};
