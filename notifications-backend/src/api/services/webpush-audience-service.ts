import { CreateWebpushAudienceUseCase } from "../../application/use-cases/webpush-audience/create-webpush-audience-use-case";
import { CreateWepushAudienceDTO } from "../../application/use-cases/webpush-audience/dto";
import { FindAllByApplicationIdUseCase } from "../../application/use-cases/webpush-audience/find-all-by-application-id-use-case";
import { WebpushAudience } from "../../domain/entities/webpush-audience/WebpushAudience";
import { WebpushAudienceRepository } from "../../infra/repositories/typeorm/webpush-audience/webpush-audience-repository";
import { IWebpushAudienceRepository } from "../../infra/repositories/typeorm/webpush-audience/webpush-audience-repository-interface";
import { ApplicationService } from "./application-service";

export class WebpushAudienceService {
    private applicationService: ApplicationService
    private webpushAudienceRepository: IWebpushAudienceRepository
    private createWebpushAudienceUseCase: CreateWebpushAudienceUseCase
    private findAllWebpushAudienceByApplicationIdUseCase: FindAllByApplicationIdUseCase

    constructor() {
        this.applicationService = new ApplicationService()
        this.webpushAudienceRepository = new WebpushAudienceRepository()
        this.createWebpushAudienceUseCase = new CreateWebpushAudienceUseCase(this.webpushAudienceRepository)
        this.findAllWebpushAudienceByApplicationIdUseCase = new FindAllByApplicationIdUseCase(this.webpushAudienceRepository)
    }


    async create(createWebpushAudienceDto: CreateWepushAudienceDTO): Promise<void> {
        const application = await this.applicationService.findOne(createWebpushAudienceDto.applicationId)
        if(!application) throw new Error('Aplicação não encontrada')

        createWebpushAudienceDto.application = application
        return this.createWebpushAudienceUseCase.execute(createWebpushAudienceDto);
    }

    async findAllByApplicationId(applicationId: number): Promise<WebpushAudience[] | null> {
        return this.findAllWebpushAudienceByApplicationIdUseCase.execute(applicationId);
    }
}
