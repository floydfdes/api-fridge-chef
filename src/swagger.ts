import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const isDevelopment = process.env.NODE_ENV !== 'production';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fridge Chef API',
            version: '1.0.0',
            description: 'API for Fridge Chef application',
        },
        servers: [
            {
                url: isDevelopment ? 'http://localhost:3000' : 'https://api.flofer.com/api/appfridgecheck',
                description: isDevelopment ? 'Development server' : 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }], // This line ensures the Authorize button appears
    },
    apis: ['./src/routes/*.ts'], // Path to the API routes files
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
