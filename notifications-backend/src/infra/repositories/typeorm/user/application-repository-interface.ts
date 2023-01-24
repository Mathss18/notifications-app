import { User } from "../../../../domain/entities/user/User";

export interface IUserRepository {
  findAll(): Promise<User[] | null>;
  findOne(id: number): Promise<User | null>;
  insert(entity: User): Promise<User | null>;
  update(entity: User): Promise<User | null>;
  delete(entity: User): Promise<User | null>;
  findByEmailAndPassword(email: string, password: string): Promise<User | null>;
}