import { IApplication } from "../../../domain/entities/application/Application";

export type CreateApplicationDTO = Partial<
    IApplication
> & { userId: number } // Forgein Keys go here
