import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Application } from "../application/Application";

export interface INotification {
  id?: number
  channel: string;
  origin: string;
  application: Application
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity('notifications')
export class Notification {

  @PrimaryGeneratedColumn()
  public id?: number

  @Column({ type: 'varchar', length: 255 })
  public channel: string

  @Column({ type: 'varchar', length: 255 })
  public origin: string

  @ManyToOne(() => Application)
  @JoinColumn({ name: 'application_id' })
  public application: Application

  @CreateDateColumn()
  public createdAt?: Date

  @UpdateDateColumn()
  public updatedAt?: Date

  constructor(
    channel: string,
    origin: string,
    application: Application,
    createdAt?: Date,
    updatedAt?: Date,
    id?: number
  ) {
    this.channel = channel;
    this.origin = origin;
    this.application = application;
    this.id = id;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}