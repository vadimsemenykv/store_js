import express from 'express';
import NamedRouter from 'express-named-router-url-generator';
import OrderController from "../../controllers/api/OrderController";

let Router = NamedRouter(express);

Router.post('/api/order', OrderController.create, { name: "api:order" });

export default Router.expressRouter;