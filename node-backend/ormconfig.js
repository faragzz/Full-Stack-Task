"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const apartment_1 = require("./src/entities/apartment");
const dotenv_1 = __importDefault(require("dotenv"));
const apartmentDetails_1 = require("./src/entities/apartmentDetails");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [apartment_1.Apartment, apartmentDetails_1.ApartmentDetails],
    synchronize: true,
    logging: false,
});
