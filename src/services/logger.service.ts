import { ILogger } from 'interfaces';
import { Logging } from '../models';
import { Service } from "typedi";

class logger implements ILogger{
  public error(message, organisation = null){
    Logging.create({organisation: organisation, loglevel: "error", logtext: message.toString()})
  }
  public debug(message, organisation = null){
    Logging.create({organisation: organisation, loglevel: "debug", logtext: message.toString()})
  }
  public info(message, organisation = null){
    Logging.create({organisation: organisation, loglevel: "info", logtext: message.toString()})
  }
}

export { logger };