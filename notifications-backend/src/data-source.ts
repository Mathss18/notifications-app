import 'dotenv'
import "reflect-metadata"
import { DataSource } from 'typeorm'
import { ApplicationConfiguration } from './domain/entities/application-configuration/ApplicationConfiguration'
import { Application } from './domain/entities/application/Application'
import { Notification } from './domain/entities/notifications/Notification'
import { User } from './domain/entities/user/User'
import { WebpushAudience } from './domain/entities/webpush-audience/WebpushAudience'

const port = process.env.MYSQL_PORT as number | undefined

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: port,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: true,
    entities: [Application, User, ApplicationConfiguration, WebpushAudience, Notification],
    migrations: [`${__dirname}/api/migrations/*.{ts,js}`],
})