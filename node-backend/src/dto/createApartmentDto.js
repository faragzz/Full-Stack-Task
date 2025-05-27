"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateApartmentDto:
 *       type: object
 *       required:
 *         - unitName
 *         - unitNumber
 *         - project
 *         - price
 *         - details
 *       properties:
 *         unitName:
 *           type: string
 *           description: The name of the apartment unit
 *         unitNumber:
 *           type: string
 *           description: The apartment unit number
 *         project:
 *           type: string
 *           description: The project or building name
 *         description:
 *           type: string
 *           description: Optional description of the apartment
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the apartment (max 2 decimal places)
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Optional array of image URLs
 *         details:
 *           $ref: '#/components/schemas/CreateApartmentDetailsDto'
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateApartmentDto = void 0;
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const createApartmentDetailsDto_1 = require("./createApartmentDetailsDto");
class CreateApartmentDto {
}
exports.CreateApartmentDto = CreateApartmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApartmentDto.prototype, "unitName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApartmentDto.prototype, "unitNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApartmentDto.prototype, "project", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApartmentDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], CreateApartmentDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateApartmentDto.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsDefined)({ message: 'details must be provided' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'details cannot be empty' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => createApartmentDetailsDto_1.CreateApartmentDetailsDto),
    __metadata("design:type", createApartmentDetailsDto_1.CreateApartmentDetailsDto)
], CreateApartmentDto.prototype, "details", void 0);
