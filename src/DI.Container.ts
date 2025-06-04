import { logger } from './services';
import { BackOfficeRepository, OrganisationRepository, MemberRepository, RideRepository, ResultRepository } from './repositories';
import { Container } from "typedi";

const container = Container.of();

export function initDI() {
    //Services
    const loggerservice = new logger();
    container.set("logger", loggerservice);

    //repository
    const backofficerepository = new BackOfficeRepository ();
    container.set('backofficerepository', backofficerepository);
    const organisationrepository = new OrganisationRepository();
    container.set('organisationrepository', organisationrepository);
    const memberrepository = new MemberRepository();
    container.set('memberrepository', memberrepository);
    const riderepository = new RideRepository();
    container.set('riderepository', riderepository);
    const resultrepository = new ResultRepository();
    container.set('resultrepository', resultrepository);
}