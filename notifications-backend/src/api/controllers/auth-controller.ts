import { LoginUserDTO } from "../../application/use-cases/user/dto";
import { JwtService } from "../services/jwt-service";
import { UserService } from "../services/user-service";

export class AuthController {
    private userService: UserService
    constructor(private readonly authService: JwtService) {
        this.userService = new UserService()
    }

    async authenticate(loginUserDTO: LoginUserDTO): Promise<string | false> {
        const user = await this.userService.authenticate(loginUserDTO)
        if (user) {
            return this.authService.generateToken({userId: user.id});
        }
        return false
    }
}
