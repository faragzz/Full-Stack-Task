"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateApartmentDetailsDto:
 *       type: object
 *       required:
 *         - noBedRooms
 *         - noBathrooms
 *         - area
 *       properties:
 *         noBedRooms:
 *           type: number
 *           description: Number of bedrooms
 *         noBathrooms:
 *           type: number
 *           description: Number of bathrooms
 *         area:
 *           type: number
 *           description: Area in square meters
 *         policies:
 *           type: string
 *           description: Optional policies (e.g. pets allowed, smoking rules)
 *         additionalNotes:
 *           type: string
 *           description: Any additional notes or information
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
exports.CreateApartmentDetailsDto = void 0;
const class_validator_1 = require("class-validator");
class CreateApartmentDetailsDto {
}
exports.CreateApartmentDetailsDto = CreateApartmentDetailsDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'noBedRooms is required' }),
    __metadata("design:type", Number)
], CreateApartmentDetailsDto.prototype, "noBedRooms", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'noBathrooms is required' }),
    __metadata("design:type", Number)
], CreateApartmentDetailsDto.prototype, "noBathrooms", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'area is required' }),
    __metadata("design:type", Number)
], CreateApartmentDetailsDto.prototype, "area", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApartmentDetailsDto.prototype, "policies", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApartmentDetailsDto.prototype, "additionalNotes", void 0);
