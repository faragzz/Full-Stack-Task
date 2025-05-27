"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllApartments = exports.deleteApartmentById = exports.searchApartments = exports.createApartment = exports.getApartmentById = exports.getApartments = void 0;
const ormconfig_1 = require("../../ormconfig");
const apartment_1 = require("../entities/apartment");
const apartmentRepo = ormconfig_1.AppDataSource.getRepository(apartment_1.Apartment);
/**
 * Retrieves a paginated list of apartments.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of apartments per page.
 * @returns {Promise<object>} An object containing apartment data, pagination info, and status.
 */
const getApartments = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * limit;
        const [apartments, total] = yield apartmentRepo.findAndCount({
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
    }
    catch (error) {
        console.error('Error fetching apartments with pagination:', error);
        return {
            status: 'error',
            message: 'Internal server error',
        };
    }
});
exports.getApartments = getApartments;
/**
 * Retrieves a single apartment by its ID.
 *
 * @param {number} id - The ID of the apartment.
 * @returns {Promise<object>} The apartment data and status, or an error message if not found.
 */
const getApartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartment = yield apartmentRepo.findOne({
            where: { id },
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
    }
    catch (error) {
        console.error(`Error fetching apartment with id ${id}:`, error);
        return {
            status: 'error',
            message: 'Internal server error',
        };
    }
});
exports.getApartmentById = getApartmentById;
/**
 * Creates a new apartment entry in the database.
 *
 * @param {CreateApartmentDto} createApartmentDto - The DTO containing apartment creation data.
 * @returns {Promise<object>} The created apartment data and status.
 */
const createApartment = (createApartmentDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartment = apartmentRepo.create(createApartmentDto);
        yield apartmentRepo.save(apartment);
        return {
            status: 'success',
            data: apartment,
        };
    }
    catch (error) {
        console.error('Error creating apartment:', error);
        return {
            status: 'error',
            message: 'Internal server error',
        };
    }
});
exports.createApartment = createApartment;
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
const searchApartments = (_a) => __awaiter(void 0, [_a], void 0, function* ({ unitName, unitNumber, project, page, limit, }) {
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
        const [apartments, total] = yield query.getManyAndCount();
        return {
            status: 'success',
            data: apartments,
            total,
            page,
            last_page: Math.ceil(total / limit),
        };
    }
    catch (error) {
        console.error('Error searching apartments:', error);
        return {
            status: 'error',
            message: 'Internal server error',
        };
    }
});
exports.searchApartments = searchApartments;
/**
 * Deletes a single apartment by its ID.
 *
 * @param {number} id - The ID of the apartment to delete.
 * @returns {Promise<object>} Status and message of the operation.
 */
const deleteApartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield apartmentRepo.delete(id);
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
    }
    catch (error) {
        console.error(`Error deleting apartment with id ${id}:`, error);
        return {
            status: 'error',
            message: 'Internal server error',
        };
    }
});
exports.deleteApartmentById = deleteApartmentById;
/**
 * Deletes all apartments from the database.
 *
 * @returns {Promise<object>} Status and message of the operation.
 */
const deleteAllApartments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield apartmentRepo.query('TRUNCATE TABLE "apartment" CASCADE');
        return {
            status: 'success',
            message: 'All apartments have been deleted successfully.',
        };
    }
    catch (error) {
        console.error('Error deleting all apartments:', error);
        return {
            status: 'error',
            message: 'Internal server error',
        };
    }
});
exports.deleteAllApartments = deleteAllApartments;
exports.default = {
    getApartments: exports.getApartments,
    getApartmentById: exports.getApartmentById,
    createApartment: exports.createApartment,
    searchApartments: exports.searchApartments,
    deleteApartmentById: exports.deleteApartmentById,
    deleteAllApartments: exports.deleteAllApartments
};
