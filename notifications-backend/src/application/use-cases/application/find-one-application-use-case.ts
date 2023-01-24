import { Application } from "../../../domain/entities/application/Application";
import { IApplicationRepository } from "../../../infra/repositories/typeorm/application/application-repository-interface";

export class FindOneApplicationsUseCase {

    constructor(private applicationRepository: IApplicationRepository) { }

    async execute(id: number): Promise<Application | null> {
        return this.applicationRepository.findOne(id)
    }
}