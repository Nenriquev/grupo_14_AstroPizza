import express from "express";
import indexController from "../controllers/indexController.js";

const indexRouter = express.Router()

indexRouter.get('/', indexController.index);
indexRouter.get('/faqs', indexController.faqs);
indexRouter.get('/product_detail', indexController.productDetail);


export default indexRouter;