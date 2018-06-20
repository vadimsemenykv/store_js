import express from 'express';
import NamedRouter from 'express-named-router-url-generator';
import UserController from "../../controllers/api/UserController";

let Router = NamedRouter(express);

// Router.post('/api/user', UserController.create, { name: "api:user:create" });
Router.patch('/api/user', UserController.change, { name: "api:user" });
// Router.patch('/api/user/login', UserController.login, { name: "api:user:login" });
// Router.patch('/api/user/logout', UserController.logout, { name: "api:user:logout" });

export default Router.expressRouter;