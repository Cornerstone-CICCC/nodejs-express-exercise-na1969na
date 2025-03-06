import express from "express";
import productRoutes from "./routes/productRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
