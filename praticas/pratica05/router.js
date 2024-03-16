const express = require('express');
const router = express.Router();

const products = [{ id: 1, name: "Grape", price: 15.00 }];

router.get("/products", function (req, res) {
    res.json(products);
});

router.get("/products/:productId", function (req, res) {
    const localized = products.find((product) => product.id == req.params.productId);

    if (!localized) {
        res.status(404).json({ msg: "Produto não encontrado" })
        return;
    }
    res.json({});
});

router.post("/products", function (req, res) {
    if (!req.body || !req.body.name || !req.body.price) {
        res.status(422).json({ msg: "Nome e/ou preco do produto obrigatórios" })
        return;
    }
    const newProduct = {
        id: products.lenght + 1,
        name: req.body.name, price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
})

router.put("/products/:productId", function (req, res) {
    const localized = products.find((product) => product.id == req.params.productId);

    if (!localized) {
        res.status(404).json({ msg: "Produto não encontrado" })
        return;
    }

    localized.name = req.body.name;
    localized.price = req.body.price;

    res.json(localized);
});

router.delete("/products/:productId", function(req, res){
    const position = products.findIndex((product) => product.id == req.params.productId);

    if(position < 0) {
        res.status(404).json({msg: "Produto não encontrado."})
        return;
    }

    products.splice(position, 1);
    res.status(204).end();
})

module.exports = router;