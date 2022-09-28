const express = require('express')
const {request, response} = require("express");
const { randomUUID } = require("crypto")

const app = express();

app.use(express.json());

const products = [];

/**
 * POST => Inserir um dado
 * Get => Buscar um/mais dados
 * PUT => ALterar um dado
 * DELETE => Remover um dado
 */

/**
 * Body => Sempre que eu quiser enviar dados para a minha aplicação
 * Params => /product/234782374827348234
 * Query => product?id=234782374827348234&value=234782374827348234
 */
app.post('/products', (request, response) => {
    // Nome e preço => name  e price
    const {name, price} = request.body;

    const product = {
        name,
        price,
        id: randomUUID()
    };

    products.push(product);

    return response.json(products);
});

app.get("/products", (request, response) => {
    return response.json(products);
});


app.listen(4002, () => console.log('Servidor esta rodando na porta 4002'))

