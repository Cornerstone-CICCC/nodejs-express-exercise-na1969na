import { Router, Request, Response } from "express";
import { Product, products } from "../models/product";

const router = Router();

// Fetch all products
router.get("/", (req: Request, res: Response) => {
  res.json(products);
});

// Add a new product
router.post("/", (req: Request, res: Response) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).send("Please provide name and price.");
  } else {
    const newProduct: Product = {
      id: products.length + 1,
      ...req.body,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  }
});

// Fetch a specific product by ID
router.get("/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    res.status(404).send("Product not found");
  } else {
    res.json(product);
  }
});

// Update a specific product by ID
router.put("/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    res.status(404).send("Product not found");
  } else {
    Object.assign(product, req.body);
    res.json(product);
  }
});

// Delete a specific product by ID
router.delete("/:id", (req: Request, res: Response) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send("Product not found");
  } else {
    const deletedProduct = products.splice(index, 1)[0];
    res.send("Product deleted: " + deletedProduct.name);
  }
});

export default router;