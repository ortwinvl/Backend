export interface ILogger {
    error : (message, organisation) => void
    debug : (message, organisation) => void
    info : (message, organisation) => void
}