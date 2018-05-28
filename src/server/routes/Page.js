import express from 'express';
import PageController from '../controllers/PageController';
import NamedRouter from 'express-named-router-url-generator';

let Router = NamedRouter(express);

Router.get(
    '/page/:name',
    PageController.index,
    {
        name: "pages",
        where: {
            name: NamedRouter.SLUG
        }
    }
);

export default Router.expressRouter;