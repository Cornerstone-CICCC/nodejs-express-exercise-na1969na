"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../models/product");
const router = (0, express_1.Router)();
// Fetch all products
router.get("/", (req, res) => {
    res.json(product_1.products);
});
// Add a new product
router.post("/", (req, res) => {
    if (!req.body.name || !req.body.price) {
        res.status(400).send("Please provide name and price.");
    }
    else {
        const newProduct = Object.assign({ id: product_1.products.length + 1 }, req.body);
        product_1.products.push(newProduct);
        res.status(201).json(newProduct);
    }
});
// Fetch a specific product by ID
router.get("/:id", (req, res) => {
    const product = product_1.products.find((p) => p.id === parseInt(req.params.id));
    if (!product) {
        res.status(404).send("Product not found");
    }
    else {
        res.json(product);
    }
});
// Update a specific product by ID
router.put("/:id", (req, res) => {
    const product = product_1.products.find((p) => p.id === parseInt(req.params.id));
    if (!product) {
        res.status(404).send("Product not found");
    }
    else {
        Object.assign(product, req.body);
        res.json(product);
    }
});
// Delete a specific product by ID
router.delete("/:id", (req, res) => {
    const index = product_1.products.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send("Product not found");
    }
    else {
        const deletedProduct = product_1.products.splice(index, 1)[0];
        res.send("Product deleted: " + deletedProduct.name);
    }
});
exports.default = router;
