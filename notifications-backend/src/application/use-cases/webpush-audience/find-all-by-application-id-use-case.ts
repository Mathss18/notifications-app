import { WebpushAudience } from "../../../domain/entities/webpush-audience/WebpushAudience";
import { IWebpushAudienceRepository } from "../../../infra/repositories/typeorm/webpush-audience/webpush-audience-repository-interface";
import { CreateWepushAudienceDTO } from "./dto";

export class FindAllByApplicationIdUseCase {

    constructor(private webpushRepository: IWebpushAudienceRepository) { }

    async execute(applicationId: number): Promise<WebpushAudience[] | null> {
        return this.webpushRepository.findAllByApplicationId(applicationId);
    }

}
