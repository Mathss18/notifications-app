import { User } from "../../../domain/entities/user/User";
import { IUserRepository } from "../../../infra/repositories/typeorm/user/application-repository-interface";
import { CreateUserDTO } from "./dto";

export class CreateUserUseCase {

    constructor(private userRepository: IUserRepository) { }

    async execute(input: CreateUserDTO): Promise<User | null> {
        const { name, email, password } = input;

        const user = new User(name, email, password)
        user.validate()
        
        return this.userRepository.insert(user);
    }

}
