import express from "express";
import cartController from "../controllers/cartController.js";

const cartRouter = express.Router()

cartRouter.get('/cart', cartController.cart)

export default cartRouter;