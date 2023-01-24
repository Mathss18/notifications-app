import { Application } from "../../../domain/entities/application/Application";
import { IApplicationRepository } from "../../../infra/repositories/typeorm/application/application-repository-interface";

export class ListApplicationsUseCase {

    constructor(private applicationRepository: IApplicationRepository) { }

    async execute(): Promise<Application[] | null> {
        return this.applicationRepository.findAll()
    }
}