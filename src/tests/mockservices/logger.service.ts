import { ILogger } from '../../interfaces';

class logger implements ILogger{
  public error(message, organisation = null){
    console.log(JSON.stringify({organisation: organisation, loglevel: "error", logtext: message.toString()}))
  }
  public debug(message, organisation = null){
    console.log(JSON.stringify({organisation: organisation, loglevel: "debug", logtext: message.toString()}))
  }
  public info(message, organisation = null){
    console.log(JSON.stringify({organisation: organisation, loglevel: "info", logtext: message.toString()}))
  }
}

export { logger };