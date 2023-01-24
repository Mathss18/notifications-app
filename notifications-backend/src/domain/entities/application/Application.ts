import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApplicationConfiguration } from "../application-configuration/ApplicationConfiguration";
import { User } from "../user/User";
import { ApplicationValidator } from "./validation/application-validator";

export interface IApplication {
  id?: number
  name: string;
  webpush: boolean;
  email: boolean;
  sms: boolean;
  user: User;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity('applications')
export class Application {

  @PrimaryGeneratedColumn()
  public id?: number

  @Column({ type: 'varchar', length: 255 })
  public name: string

  @Column({ type: 'bool' })
  public webpush: boolean

  @Column({ type: 'bool' })
  public email: boolean

  @Column({ type: 'bool' })
  public sms: boolean

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user: User

  @CreateDateColumn()
  public createdAt?: Date

  @UpdateDateColumn()
  public updatedAt?: Date

  constructor(
    name: string,
    webpush: boolean,
    email: boolean,
    sms: boolean,
    user: User,
    createdAt?: Date,
    updatedAt?: Date,
    id?: number
  ) {
    this.name = name;
    this.webpush = webpush;
    this.email = email;
    this.sms = sms;
    this.user = user;
    this.id = id;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  public validate() {
    new ApplicationValidator({ id: this.id, name: this.name, webpush: this.webpush, email: this.email, sms: this.sms, user: this.user, createdAt: this.createdAt, updatedAt: this.updatedAt }).validate()
  }
}