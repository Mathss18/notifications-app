import { CreateApplicationDTO } from "../../application/use-cases/application/dto";
import { Application } from "../../domain/entities/application/Application";
import { ApplicationService } from "../services/application-service";

export class ApplicationController {
    private applicationService: ApplicationService
    constructor() {
        this.applicationService = new ApplicationService()
    }

    create(createApplicationDto: CreateApplicationDTO): Promise<Application | null> {
        return this.applicationService.create(createApplicationDto);
    }

    findAll(): Promise<Application[] | null> {
        return this.applicationService.findAll();
    }

    findOne(id: number): Promise<Application | null> {
        return this.applicationService.findOne(id);
    }

    findAllByUserId(userId: number): Promise<Application[] | null> {
        return this.applicationService.findAllByUserId(userId);
    }
}
