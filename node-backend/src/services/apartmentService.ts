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

type SearchParams = {
    unitName?: string;
    unitNumber?: string;
    project?: string;
    page: number;
    limit: number;
};
/**
 * Searches apartments based on optional filters and returns paginated results.
 *
 * @param {Object} filters - Object containing optional filter parameters.
 * @param {string} [filters.unitName] - Filter by unit name (partial match, case-insensitive).
 * @param {string} [filters.unitNumber] - Filter by unit number (partial match, case-insensitive).
 * @param {string} [filters.project] - Filter by project name (partial match, case-insensitive).
 * @param {number} [filters.page=1] - The page number for pagination.
 * @param {number} [filters.limit=10] - Number of items per page.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing filtered apartments, pagination metadata, and status.
 */


export const searchApartments = async ({
                                           unitName,
                                           unitNumber,
                                           project,
                                           page,
                                           limit,
                                       }: SearchParams) => {
    try {
        const skip = (page - 1) * limit;

        const query = apartmentRepo
            .createQueryBuilder('apartment')
            .skip(skip)
            .take(limit);

        if (unitName) {
            query.andWhere('LOWER(apartment.unitName) LIKE LOWER(:unitName)', {
                unitName: `%${unitName}%`,
            });
        }

        if (unitNumber) {
            query.andWhere('LOWER(apartment.unitNumber) LIKE LOWER(:unitNumber)', {
                unitNumber: `%${unitNumber}%`,
            });
        }

        if (project) {
            query.andWhere('LOWER(apartment.project) LIKE LOWER(:project)', {
                project: `%${project}%`,
            });
        }

        const [apartments, total] = await query.getManyAndCount();

        return {
            status: 'success',
            data: apartments,
            total,
            page,
            last_page: Math.ceil(total / limit),
        };
    } catch (error) {
        console.error('Error searching apartments:', error);
        return {
            status: 'error',
            message: 'Internal server error',
        };
    }
};


/**
 * Deletes a single apartment by its ID.
 *
 * @param {number} id - The ID of the apartment to delete.
 * @returns {Promise<object>} Status and message of the operation.
 */
export const deleteApartmentById = async (id: number) => {
    try {
        const result = await apartmentRepo.delete(id);

        if (result.affected === 0) {
            return {
                status: 'error',
                message: `Apartment with id ${id} not found.`,
            };
        }

        return {
            status: 'success',
            message: `Apartment with id ${id} has been deleted successfully.`,
        };
    } catch (error) {
        console.error(`Error deleting apartment with id ${id}:`, error);
        return {
            status: 'error',
            message: 'Internal server error',
        };
    }
};


/**
 * Deletes all apartments from the database.
 *
 * @returns {Promise<object>} Status and message of the operation.
 */
export const deleteAllApartments = async () => {
    try {
        await apartmentRepo.query('TRUNCATE TABLE "apartment" CASCADE');

        return {
            status: 'success',
            message: 'All apartments have been deleted successfully.',
        };
    } catch (error) {
        console.error('Error deleting all apartments:', error);
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
    searchApartments,
    deleteApartmentById,
    deleteAllApartments
};
