import { ILogger } from 'interfaces';
import { logger } from 'services';
import { Service, Inject } from "typedi";

@Service()
export class _repository{
    public logger : logger;
    constructor(@Inject() logger : logger) {
        this.logger = logger;
    }
}