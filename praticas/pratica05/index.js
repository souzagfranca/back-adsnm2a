const express = require('express');
const routerProducts = require('../pratica05/router');
const app = express();

app.use(express.json());
app.use(routerProducts);

app.listen(3000, function () {
    console.log("API está online!")
})

module.exports = app;