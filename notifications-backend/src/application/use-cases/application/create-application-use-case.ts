import { Application } from "../../../domain/entities/application/Application";
import { IApplicationRepository } from "../../../infra/repositories/typeorm/application/application-repository-interface";
import { CreateApplicationDTO } from "./dto";

export class CreateApplicationUseCase {

    constructor(private applicationRepository: IApplicationRepository) { }

    async execute(input: CreateApplicationDTO): Promise<Application | null> {
        const { name, webpush, email, sms, user } = input;

        const application = new Application(name!, webpush!, email!, sms!, user!)
        application.validate()

        return this.applicationRepository.insert(application)
    }

}
