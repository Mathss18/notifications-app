import { WebpushAudience } from "../../../../domain/entities/webpush-audience/WebpushAudience";

export interface IWebpushAudienceRepository {
  insert(entity: WebpushAudience): Promise<void>;
  findAllByApplicationId(applicationId: number): Promise<WebpushAudience[] | null>
}