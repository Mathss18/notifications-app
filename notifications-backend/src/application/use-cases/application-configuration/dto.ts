import { IApplicationConfiguration } from "../../../domain/entities/application-configuration/ApplicationConfiguration";

export type CreateApplicationConfigurationDTO = Partial<
    IApplicationConfiguration
> & { applicationId: number } // Forgein Keys go here

export type UpdateApplicationConfigurationDTO = Omit<
    IApplicationConfiguration,
    "application" | "updatedAt" | "createdAt"
>


