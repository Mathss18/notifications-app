import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { WebpushAudience } from "../../../../domain/entities/webpush-audience/WebpushAudience";
import { IWebpushAudienceRepository } from "./webpush-audience-repository-interface";

export class WebpushAudienceRepository implements IWebpushAudienceRepository {


    private webpushAudienceRepository: Repository<WebpushAudience>;

    constructor() {
        this.webpushAudienceRepository = AppDataSource.getRepository(WebpushAudience)
    }

    async insert(webpushAudience: WebpushAudience): Promise<void> {
        this.webpushAudienceRepository.save(webpushAudience);
    }

    async findAllByApplicationId(applicationId: number): Promise<WebpushAudience[] | null> {
        return this.webpushAudienceRepository.findBy({ application: { id: applicationId } })
    }
}