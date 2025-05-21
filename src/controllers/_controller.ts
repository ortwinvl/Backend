import { ILogger } from 'interfaces';

export class _controller{
    public logger : ILogger;
    constructor(logger : ILogger) {
        this.logger = logger;
    }
}