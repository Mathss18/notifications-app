import { ApplicationConfiguration } from "../../../domain/entities/application-configuration/ApplicationConfiguration";
import { IApplicationConfigurationRepository } from "../../../infra/repositories/typeorm/application-configuration/application-configuration-repository-interface";

export class FindOneApplicationConfigurationByApplicationIdUseCase {

    constructor(private applicationConfigurationRepository: IApplicationConfigurationRepository) { }

    async execute(id: number): Promise<ApplicationConfiguration | null> {
        
        return this.applicationConfigurationRepository.findOne(id)
    }

}
