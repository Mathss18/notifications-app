import { CreateWepushAudienceDTO } from "../../application/use-cases/webpush-audience/dto";
import { WebpushAudience } from "../../domain/entities/webpush-audience/WebpushAudience";
import { WebpushAudienceService } from "../services/webpush-audience-service";

export class WebpushAudienceController {
    private webpushAudienceService: WebpushAudienceService
    constructor() {
        this.webpushAudienceService = new WebpushAudienceService()
    }

    create(createWebpushAudienceDto: CreateWepushAudienceDTO): Promise<void> {
        return this.webpushAudienceService.create(createWebpushAudienceDto);
    }

    findAllByApplicationId(applicationId: number): Promise<WebpushAudience[] | null> {
        return this.webpushAudienceService.findAllByApplicationId(applicationId);
    }
}
