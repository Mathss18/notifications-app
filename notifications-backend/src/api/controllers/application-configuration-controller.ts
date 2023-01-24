import { CreateApplicationConfigurationDTO, UpdateApplicationConfigurationDTO } from "../../application/use-cases/application-configuration/dto";
import { ApplicationConfiguration } from "../../domain/entities/application-configuration/ApplicationConfiguration";
import { ApplicationConfigurationService } from "../services/application-configuration-service";

export class ApplicationConfigurationController {
    private applicationConfigurationService: ApplicationConfigurationService
    constructor() {
        this.applicationConfigurationService = new ApplicationConfigurationService()
    }

    create(createApplicationConfigurationDto: CreateApplicationConfigurationDTO): Promise<ApplicationConfiguration | null> {
        return this.applicationConfigurationService.create(createApplicationConfigurationDto);
    }

    update(updateApplicationConfigurationDto: UpdateApplicationConfigurationDTO): Promise<ApplicationConfiguration | null> {
        return this.applicationConfigurationService.update(updateApplicationConfigurationDto);
    }

    findOne(id: number): Promise<ApplicationConfiguration | null> {
        return this.applicationConfigurationService.findOne(id);
    }

    findByApplicationId(applicationId: number): Promise<ApplicationConfiguration | null> {
        return this.applicationConfigurationService.findByApplicationId(applicationId);
    }
}
