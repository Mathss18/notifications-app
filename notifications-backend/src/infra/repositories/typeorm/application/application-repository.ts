import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { Application } from "../../../../domain/entities/application/Application";
import { IApplicationRepository } from "./application-repository-interface";

export class ApplicationRepository implements IApplicationRepository {

    private applicationRepository: Repository<Application>;

    constructor() {
        this.applicationRepository = AppDataSource.getRepository(Application)
    }

    async findAll(): Promise<Application[]> {
        return this.applicationRepository.find({ where: { user: { id: 1 } } });
    }

    async findOne(id: number): Promise<Application | null> {
        return this.applicationRepository.findOne({ where: { id: id } });
    }

    async insert(application: Application): Promise<Application> {
        return this.applicationRepository.save(application);
    }

    async update(application: Application): Promise<Application> {
        return this.applicationRepository.save(application);
    }

    async delete(application: Application): Promise<Application> {
        return this.applicationRepository.remove(application);
    }

    async findAllByUserId(userId: number): Promise<Application[]> {
        return this.applicationRepository.find({ where: { user: { id: userId } } });
    }
}