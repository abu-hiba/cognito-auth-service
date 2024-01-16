import { Handler } from 'express';

export enum HttpMethod {
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    DELETE = 'delete',
}

export abstract class Controller {
    constructor(
        private method: HttpMethod,
        private route: string,
    ) {}

    handler: Handler = () => {};
    getMethod() { return this.method; }
    getRoute() { return this.route; }
}

