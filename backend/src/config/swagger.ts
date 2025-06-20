import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Manager API',
            version: '1.0.0',
            description: 'Documentação da API de gerenciamento de produtos, cupons e descontos.',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
