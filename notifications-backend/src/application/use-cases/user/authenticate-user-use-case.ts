import { User } from "../../../domain/entities/user/User";
import { LoginUserDTO } from "./dto";
import { IUserRepository } from "../../../infra/repositories/typeorm/user/application-repository-interface";

export class AuthenticateUserUseCase {

    constructor(private userRepository: IUserRepository) { }

    async execute(input: LoginUserDTO): Promise<User | null> {
        const { email, password } = input;
        return this.userRepository.findByEmailAndPassword(email, password!);
    }

}
