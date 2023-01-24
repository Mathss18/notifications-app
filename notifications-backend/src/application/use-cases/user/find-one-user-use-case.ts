import { User } from "../../../domain/entities/user/User";
import { IUserRepository } from "../../../infra/repositories/typeorm/user/application-repository-interface";

export class FindOneUserUseCase {

    constructor(private userRepository: IUserRepository) { }

    async execute(id: number): Promise<User | null> {
        return this.userRepository.findOne(id);
    }

}
