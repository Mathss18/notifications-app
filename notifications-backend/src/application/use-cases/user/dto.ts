import { IUser } from "../../../domain/entities/user/User";

export type CreateUserDTO = IUser;

export type UpdateUserDTO = Omit<
    CreateUserDTO,
    "createdAt" | "updatedAt"
>;

export type LoginUserDTO = Omit<
    CreateUserDTO,
    "name" | "createdAt" | "updatedAt"
>;
