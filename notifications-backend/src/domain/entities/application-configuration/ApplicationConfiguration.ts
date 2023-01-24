import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Application } from "../application/Application";

export interface IApplicationConfiguration {
  id?: number
  webpush_website_name?: string;
  webpush_website_url?: string;
  webpush_website_image?: string;
  webpush_permisson_text?: string;
  webpush_permisson_allow_button_text?: string;
  webpush_permisson_deny_button_text?: string;
  webpush_welcome_title?: string;
  webpush_welcome_text?: string;
  webpush_redirect_url_enabled?: boolean;
  webpush_redirect_url?: string;
  email_smtp?: string;
  email_port?: string;
  email_login?: string;
  email_password?: string;
  email_sender_name?: string;
  email_sender_email?: string;
  email_template?: string;
  sms_provider?: string;
  sms_login?: string;
  sms_password?: string;
  application: Application;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity('applications-configurations')
export class ApplicationConfiguration {

  @PrimaryGeneratedColumn()
  public id?: number

  @Column({ type: 'varchar', length: 255, default: null })
  public webpush_website_name?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public webpush_website_url?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public webpush_website_image?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public webpush_permisson_text?: string

  @Column({ type: 'varchar', length: 30, default: null })
  public webpush_permisson_allow_button_text?: string

  @Column({ type: 'varchar', length: 30, default: null })
  public webpush_permisson_deny_button_text?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public webpush_welcome_title?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public webpush_welcome_text?: string

  @Column({ type: 'boolean', default: false })
  public webpush_redirect_url_enabled?: boolean

  @Column({ type: 'varchar', length: 255, default: null })
  public webpush_redirect_url?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public email_smtp?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public email_port?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public email_login?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public email_password?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public email_sender_name?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public email_sender_email?: string

  @Column({ type: 'text', default: null })
  public email_template?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public sms_provider?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public sms_login?: string

  @Column({ type: 'varchar', length: 255, default: null })
  public sms_password?: string

  @OneToOne(() => Application)
  @JoinColumn({ name: 'application_id' })
  public application: Application

  @CreateDateColumn()
  public createdAt?: Date

  @UpdateDateColumn()
  public updatedAt?: Date

  constructor(
    webpush_website_name?: string,
    webpush_website_url?: string,
    webpush_website_image?: string,
    webpush_permisson_text?: string,
    webpush_permisson_allow_button_text?: string,
    webpush_permisson_deny_button_text?: string,
    webpush_welcome_title?: string,
    webpush_welcome_text?: string,
    webpush_redirect_url_enabled?: boolean,
    webpush_redirect_url?: string,
    email_smtp?: string,
    email_port?: string,
    email_login?: string,
    email_password?: string,
    email_sender_name?: string,
    email_sender_email?: string,
    email_template?: string,
    sms_provider?: string,
    sms_login?: string,
    sms_password?: string,
    id?: number,
    application?: Application,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.webpush_website_name = webpush_website_name,
      this.webpush_website_url = webpush_website_url,
      this.webpush_website_image = webpush_website_image,
      this.webpush_permisson_text = webpush_permisson_text,
      this.webpush_permisson_allow_button_text = webpush_permisson_allow_button_text,
      this.webpush_permisson_deny_button_text = webpush_permisson_deny_button_text,
      this.webpush_welcome_title = webpush_welcome_title,
      this.webpush_welcome_text = webpush_welcome_text,
      this.webpush_redirect_url_enabled = webpush_redirect_url_enabled,
      this.webpush_redirect_url = webpush_redirect_url,
      this.email_smtp = email_smtp,
      this.email_port = email_port,
      this.email_login = email_login,
      this.email_password = email_password,
      this.email_sender_name = email_sender_name,
      this.email_sender_email = email_sender_email,
      this.email_template = email_template,
      this.sms_provider = sms_provider,
      this.sms_login = sms_login,
      this.sms_password = sms_password,
      this.id = id;
      this.application = application!
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}