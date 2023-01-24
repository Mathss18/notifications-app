import { Application } from "../../../domain/entities/application/Application";
import { IApplicationRepository } from "../../../infra/repositories/typeorm/application/application-repository-interface";

export class ListApplicationsByUserIdUseCase {

    constructor(private applicationRepository: IApplicationRepository) { }

    async execute(userId: number): Promise<Application[] | null> {
        return this.applicationRepository.findAllByUserId(userId)
    }
}