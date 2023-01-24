import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Application } from "../application/Application";

export interface IWebpushAudience {
  id?: number
  application?: Application;
  json: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity('webpush-audience')
export class WebpushAudience {

  @PrimaryGeneratedColumn()
  public id?: number

  @ManyToOne(() => Application)
  @JoinColumn({ name: 'application_id' })
  public application?: Application

  @Column({ type: "text" })
  public json: string

  @CreateDateColumn()
  public createdAt?: Date

  @UpdateDateColumn()
  public updatedAt?: Date

  constructor(
    application: Application,
    json: string,
    id?: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.application = application;
    this.json = json;
    this.id = id
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}