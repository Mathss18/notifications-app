import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { User } from "../../../../domain/entities/user/User";
import { IUserRepository } from "./application-repository-interface";

export class UserRepository implements IUserRepository {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id: id } });
    }

    async insert(application: User): Promise<User> {
        return this.userRepository.save(application);
    }

    async update(application: User): Promise<User> {
        return this.userRepository.save(application);
    }

    async delete(application: User): Promise<User> {
        return this.userRepository.remove(application);
    }

    async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email, password })
    }
}