"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apartment_routes_1 = __importDefault(require("./routes/apartment.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Apartment Backend API',
            version: '1.0.0',
            description: 'API documentation for the Apartment Listing Backend',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/controllers/*.ts', './src/dto/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use('/apartments', apartment_routes_1.default);
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
exports.default = app;
