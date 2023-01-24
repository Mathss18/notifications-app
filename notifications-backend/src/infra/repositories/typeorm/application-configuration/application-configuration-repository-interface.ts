import { ApplicationConfiguration } from "../../../../domain/entities/application-configuration/ApplicationConfiguration";

export interface IApplicationConfigurationRepository {
  findAll(): Promise<ApplicationConfiguration[] | null>;
  findOne(id: number): Promise<ApplicationConfiguration | null>;
  insert(entity: ApplicationConfiguration): Promise<ApplicationConfiguration | null>;
  update(entity: ApplicationConfiguration): Promise<ApplicationConfiguration | null>;
  delete(entity: ApplicationConfiguration): Promise<ApplicationConfiguration | null>;
  findOneByApplicationId(applicationId: number): Promise<ApplicationConfiguration | null>;
}