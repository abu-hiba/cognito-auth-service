import { NextFunction, Request, Response } from 'express';
import { User } from '../domain/user';
import { SignUpDto } from '../dtos/signUp.dto';
import { UserService } from '../services/user.service';
import { Controller, HttpMethod } from './controller.interface';

export interface TypedRequestBody<T> extends Request {
    body: T
};

export class SignUpController extends Controller {
    private userService: UserService;

    constructor() {
        super(HttpMethod.POST, '/signup');
        this.userService = new UserService();
    }

    readonly handler = async (
        req: TypedRequestBody<SignUpDto>,
        res: Response,
        next: NextFunction
    ) => {
        const user = new User(req.body);
        const result = await this.userService.signUp(user);

        res.json(result);
    }
}

