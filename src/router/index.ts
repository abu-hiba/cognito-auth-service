import express from "express";
import { SignUpController } from "../controllers/signUp.controller";

export class AuthenticationRouter {
    readonly router: express.Router;
    private controllers: (typeof SignUpController)[];

    constructor() {
        this.router = express.Router();
        this.controllers = [
            SignUpController,
        ];

        this.controllers.map(controllerClass => {
            const controller = new controllerClass();
            const method = controller.getMethod();
            const route = controller.getRoute();

            this.router[method](route, controller.handler);
        });
    }
}

