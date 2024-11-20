require('dotenv').config();
const server = require('./server');
const clientesRoutes = require('./rotas/clientes');
const produtosRoutes = require('./rotas/produtos');
const pdvRoutes = require('./rotas/ponto_de_venda');

const { upsertClientes } = require('./collection_clientes');
const { upsertProdutos } = require('./collection_produtos');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerDefinition = require('./swagger/swaggerDef');
const swaggerRoutes = require('./swagger/swaggerRoutes');

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition,
    apis: [],
};

const swaggerDocs = {
    ...swaggerJsDoc(swaggerOptions),
    paths: swaggerRoutes.paths,
};

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

async function initialize() {
    try {
        await upsertClientes();
        await upsertProdutos();

        clientesRoutes(server);
        produtosRoutes(server);
        pdvRoutes(server);

        server.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
            console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error("Erro ao inicializar o servidor:", error);
    }
}

initialize();