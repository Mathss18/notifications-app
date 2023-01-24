import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserValidator } from "./validation/user-validator";

export interface IUser {
  id?: number
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  public id?: number

  @Column({ type: "varchar", length: 255 })
  public name: string

  @Column({ type: "varchar", length: 255, unique: true })
  public email: string

  @Column({ type: "varchar", length: 255 })
  public password?: string

  @CreateDateColumn()
  public createdAt?: Date

  @UpdateDateColumn()
  public updatedAt?: Date

  constructor(
    name: string,
    email: string,
    password?: string,
    id?: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  public validate() {
    new UserValidator({ id: this.id, email: this.email, name: this.name, password: this.password, createdAt: this.createdAt, updatedAt: this.updatedAt }).validate()
  }
}