import { WebpushAudience } from "../../../domain/entities/webpush-audience/WebpushAudience";
import { IWebpushAudienceRepository } from "../../../infra/repositories/typeorm/webpush-audience/webpush-audience-repository-interface";
import { CreateWepushAudienceDTO } from "./dto";

export class CreateWebpushAudienceUseCase {

    constructor(private webpushRepository: IWebpushAudienceRepository) { }

    async execute(input: CreateWepushAudienceDTO): Promise<void> {
        const { application, json } = input;

        const webpushAudience = new WebpushAudience(application!, json)

        return this.webpushRepository.insert(webpushAudience);
    }

}
