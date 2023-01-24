import { CreateUserDTO } from "../../application/use-cases/user/dto";
import { User } from "../../domain/entities/user/User";
import { UserService } from "../services/user-service";

export class UserController {
    private userService: UserService
    constructor() {
        this.userService = new UserService()
    }

    create(createUserDto: CreateUserDTO): Promise<User | null> {
        return this.userService.create(createUserDto);
    }
}
