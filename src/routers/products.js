import express from "express";
import productsController from "../controllers/productsController.js";

const productRouter = express.Router()

productRouter.get('/product', productsController.products)

export default productRouter;