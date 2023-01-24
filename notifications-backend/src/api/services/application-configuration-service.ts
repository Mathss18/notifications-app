import { CreateApplicationConfigurationUseCase } from "../../application/use-cases/application-configuration/create-application-configuration-use-case";
import { FindOneApplicationConfigurationUseCase } from "../../application/use-cases/application-configuration/find-one-application-configuration-use-case";
import { CreateApplicationConfigurationDTO, UpdateApplicationConfigurationDTO } from "../../application/use-cases/application-configuration/dto";
import { ApplicationConfiguration } from "../../domain/entities/application-configuration/ApplicationConfiguration";
import { ApplicationConfigurationRepository } from "../../infra/repositories/typeorm/application-configuration/application-configuration-repository";
import { ApplicationService } from "./application-service";
import { FindOneApplicationConfigurationByApplicationIdUseCase } from "../../application/use-cases/application-configuration/find-one-application-configuration-by-application-id-use-case";
import { UpdateApplicationConfigurationUseCase } from "../../application/use-cases/application-configuration/update-application-configuration-use-case";

export class ApplicationConfigurationService {
    private applicationService: ApplicationService
    private applicationConfigurationRepository: ApplicationConfigurationRepository
    private createApplicationConfigurationUseCase: CreateApplicationConfigurationUseCase
    private updateApplicationConfigurationUseCase: UpdateApplicationConfigurationUseCase
    private findOneApplicationConfigurationUseCase: FindOneApplicationConfigurationUseCase
    private findOneApplicationConfigurationByApplicationIdUseCase: FindOneApplicationConfigurationByApplicationIdUseCase

    constructor() {
        this.applicationService = new ApplicationService()
        this.applicationConfigurationRepository = new ApplicationConfigurationRepository()
        this.createApplicationConfigurationUseCase = new CreateApplicationConfigurationUseCase(this.applicationConfigurationRepository)
        this.updateApplicationConfigurationUseCase = new UpdateApplicationConfigurationUseCase(this.applicationConfigurationRepository)
        this.findOneApplicationConfigurationUseCase = new FindOneApplicationConfigurationUseCase(this.applicationConfigurationRepository)
        this.findOneApplicationConfigurationByApplicationIdUseCase = new FindOneApplicationConfigurationByApplicationIdUseCase(this.applicationConfigurationRepository)
    }

    async create(createApplicationConfigurationDto: CreateApplicationConfigurationDTO): Promise<ApplicationConfiguration | null> {
        const application = await this.applicationService.findOne(createApplicationConfigurationDto.applicationId)
        if (!application) throw new Error('Application not found.')

        createApplicationConfigurationDto.application = application;
        return this.createApplicationConfigurationUseCase.execute(createApplicationConfigurationDto);
    }

    async update(updateApplicationConfigurationDto: UpdateApplicationConfigurationDTO): Promise<ApplicationConfiguration | null> {
        return this.updateApplicationConfigurationUseCase.execute(updateApplicationConfigurationDto);
    }

    async findOne(id: number): Promise<ApplicationConfiguration | null> {
        return this.findOneApplicationConfigurationUseCase.execute(id);
    }

    async findByApplicationId(applicationId: number): Promise<ApplicationConfiguration | null> {
        return this.findOneApplicationConfigurationByApplicationIdUseCase.execute(applicationId);
    }
}
