import { Application } from "../../../../domain/entities/application/Application";

export interface IApplicationRepository {
  findAll(): Promise<Application[] | null>;
  findOne(id: number): Promise<Application | null>;
  insert(entity: Application): Promise<Application | null>;
  update(entity: Application): Promise<Application | null>;
  delete(entity: Application): Promise<Application | null>;
  findAllByUserId(userId: Number): Promise<Application[] | null>;
}