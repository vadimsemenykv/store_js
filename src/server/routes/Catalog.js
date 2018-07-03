import express from 'express';
import NamedRouter from 'express-named-router-url-generator';
import CatalogController from "../controllers/CatalogController";

let Router = NamedRouter(express);

Router.get('/catalog', CatalogController.main, { name: "catalog:main" });

export default Router.expressRouter;