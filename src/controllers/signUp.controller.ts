import { NextFunction, Request, Response } from 'express';
import { User } from '../domain/user';
import { SignUpDto } from '../dtos/signUp.dto';
import { Controller, HttpMethod } from './controller.interface';
import * as AuthService from '../services/authService';

export interface TypedRequestBody<T> extends Request {
    body: T
};

export class SignUpController extends Controller {
    constructor() {
        super(HttpMethod.POST, '/signup');
    }

    async handler(
        req: TypedRequestBody<SignUpDto>,
        res: Response,
        next: NextFunction
    ) {
        const user = new User(req.body);
        const result = await AuthService.signUp(user);

        res.json(result);
    }
}

