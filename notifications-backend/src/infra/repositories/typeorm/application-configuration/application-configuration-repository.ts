import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { ApplicationConfiguration } from "../../../../domain/entities/application-configuration/ApplicationConfiguration";
import { IApplicationConfigurationRepository } from "./application-configuration-repository-interface";

export class ApplicationConfigurationRepository implements IApplicationConfigurationRepository {

    private applicationConfigurationRepository: Repository<ApplicationConfiguration>;

    constructor() {
        this.applicationConfigurationRepository = AppDataSource.getRepository(ApplicationConfiguration)
    }

    async findAll(): Promise<ApplicationConfiguration[]> {
        return this.applicationConfigurationRepository.find();
    }

    async findOne(id: number): Promise<ApplicationConfiguration | null> {
        return this.applicationConfigurationRepository.findOne({ where: { id: id } });
    }

    async insert(application: ApplicationConfiguration): Promise<ApplicationConfiguration> {
        return this.applicationConfigurationRepository.save(application);
    }

    async update(application: ApplicationConfiguration): Promise<ApplicationConfiguration | null> {
        await this.applicationConfigurationRepository.update({ id: application.id }, application);
        return this.applicationConfigurationRepository.findOne({ where: { id: application.id } });
    }

    async delete(application: ApplicationConfiguration): Promise<ApplicationConfiguration> {
        return this.applicationConfigurationRepository.remove(application);
    }

    async findOneByApplicationId(applicationId: number): Promise<ApplicationConfiguration | null> {
        return this.applicationConfigurationRepository.findOne({ where: { application: { id: applicationId } } });
    }
}