import { AuthenticateUserUseCase } from "../../application/use-cases/user/authenticate-user-use-case";
import { CreateUserUseCase } from "../../application/use-cases/user/create-user-use-case";
import { CreateUserDTO, LoginUserDTO } from "../../application/use-cases/user/dto";
import { FindOneUserUseCase } from "../../application/use-cases/user/find-one-user-use-case";
import { User } from "../../domain/entities/user/User";
import { UserRepository } from "../../infra/repositories/typeorm/user/application-repository";
import { IUserRepository } from "../../infra/repositories/typeorm/user/application-repository-interface";

export class UserService {
    private userRepository: IUserRepository
    private createUserUseCase: CreateUserUseCase
    private findOneUserUseCase: FindOneUserUseCase
    private authenticateUserUseCase: AuthenticateUserUseCase

    constructor() {
        this.userRepository = new UserRepository()
        this.createUserUseCase = new CreateUserUseCase(this.userRepository)
        this.findOneUserUseCase = new FindOneUserUseCase(this.userRepository)
        this.authenticateUserUseCase = new AuthenticateUserUseCase(this.userRepository)
    }

    findOne(id: number): Promise<User | null> {
        return this.findOneUserUseCase.execute(id);
    }

    create(createUserDto: CreateUserDTO): Promise<User | null> {
        return this.createUserUseCase.execute(createUserDto);
    }

    authenticate(loginUserDTO: LoginUserDTO): Promise<User | null> {
        return this.authenticateUserUseCase.execute(loginUserDTO);
    }
}
