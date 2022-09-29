const express = require('express');
const {request, response} = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        products = JSON.parse(data);
    }
});

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

    productFile();

    return response.json(products);
});

app.get("/products", (request, response) => {
    return response.json(products);
});

app.get("/products/:id", (request, response) => {
    const {id} = request.params;
    const product  = products.find(product => product.id === id);
    return response.json(product)
});

app.put("/products/:id", (request, response) => {
    const {id} = request.params;
    const {name, price} = request.body;

    const productIndex = products.findIndex((product) => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
    };
    productFile();
    return response.json({ message: "Produtor alterado com sucesso!" })
});

app.delete("/products/:id", (request, response) => {
    const {id} = request.params;
    const productIndex = products.findIndex((product) => product.id === id);

    products.splice(productIndex, 1);
    
    productFile()

    return response.json({ message: "Produto removido com sucesso!" })
});

// A função productFile() cria um arquivo JSON para simular um banco de dados.

function productFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err)
        }else {
            console.log("Produto inserido")
        }
    })
}

app.listen(4002, () => console.log('Servidor esta rodando na porta 4002'))

