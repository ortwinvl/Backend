import { IMemberRepository } from "./member.repo interface";
import { MemberRepository } from "./member.repository";
import { IOrganisationRepository } from "./organisation.repo.interface";
import { OrganisationRepository } from "./organisation.repository";
import { IBackOfficeRepository } from "./backoffice.repo.interface";
import { BackOfficeRepository } from "./backoffice.repository";
import { IRideRepository } from "./ride.repo.interface";
import { RideRepository } from "./ride.repository";
import { IResultRepository } from "./result.repo.interface";
import { ResultRepository } from "./result.repository";

export {
    IMemberRepository, MemberRepository,
    IOrganisationRepository, OrganisationRepository,
    IBackOfficeRepository, BackOfficeRepository,
    IRideRepository, RideRepository,
    IResultRepository, ResultRepository
};