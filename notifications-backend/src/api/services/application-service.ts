import { CreateApplicationUseCase } from "../../application/use-cases/application/create-application-use-case";
import { CreateApplicationDTO } from "../../application/use-cases/application/dto";
import { FindOneApplicationsUseCase } from "../../application/use-cases/application/find-one-application-use-case";
import { ListApplicationsByUserIdUseCase } from "../../application/use-cases/application/list-applications-by-user-id-use-case";
import { ListApplicationsUseCase } from "../../application/use-cases/application/list-applications-use-case";
import { Application } from "../../domain/entities/application/Application";
import { ApplicationRepository } from "../../infra/repositories/typeorm/application/application-repository";
import { IApplicationRepository } from "../../infra/repositories/typeorm/application/application-repository-interface";
import { UserService } from "./user-service";

export class ApplicationService {
    private userService: UserService
    private applicationRepository: IApplicationRepository
    private createApplicationUseCase: CreateApplicationUseCase
    private listApplicationsUseCase: ListApplicationsUseCase
    private findOneApplicationUseCase: FindOneApplicationsUseCase
    private listApplicationsByUserIdUseCase: ListApplicationsByUserIdUseCase

    constructor() {
        this.userService = new UserService()
        this.applicationRepository = new ApplicationRepository()
        this.createApplicationUseCase = new CreateApplicationUseCase(this.applicationRepository)
        this.listApplicationsUseCase = new ListApplicationsUseCase(this.applicationRepository)
        this.findOneApplicationUseCase = new FindOneApplicationsUseCase(this.applicationRepository)
        this.listApplicationsByUserIdUseCase = new ListApplicationsByUserIdUseCase(this.applicationRepository)
    }

    async create(createApplicationDto: CreateApplicationDTO): Promise<Application | null> {
        const user = await this.userService.findOne(createApplicationDto.userId)
        if (!user) throw new Error('User not found.')

        createApplicationDto.user = user;
        delete createApplicationDto.user.password
        return this.createApplicationUseCase.execute(createApplicationDto);
    }

    async findAll(): Promise<Application[] | null> {
        return this.listApplicationsUseCase.execute();
    }

    async findOne(id: number): Promise<Application | null> {
        return this.findOneApplicationUseCase.execute(id);
    }

    async findAllByUserId(userId: number): Promise<Application[] | null> {
        return this.listApplicationsByUserIdUseCase.execute(userId);
    }
}
