import { IWebpushAudience } from "../../../domain/entities/webpush-audience/WebpushAudience";

export type CreateWepushAudienceDTO = IWebpushAudience & { applicationId: number };
