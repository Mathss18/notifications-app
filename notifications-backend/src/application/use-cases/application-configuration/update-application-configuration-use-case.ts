import { ApplicationConfiguration } from "../../../domain/entities/application-configuration/ApplicationConfiguration";
import { IApplicationConfigurationRepository } from "../../../infra/repositories/typeorm/application-configuration/application-configuration-repository-interface";
import { UpdateApplicationConfigurationDTO } from "./dto";

export class UpdateApplicationConfigurationUseCase {

    constructor(private applicationConfigurationRepository: IApplicationConfigurationRepository) { }

    async execute(input: UpdateApplicationConfigurationDTO): Promise<ApplicationConfiguration | null> {
        const {
            id,
            webpush_website_name,
            webpush_website_url,
            webpush_website_image,
            webpush_permisson_text,
            webpush_permisson_allow_button_text,
            webpush_permisson_deny_button_text,
            webpush_welcome_title,
            webpush_welcome_text,
            webpush_redirect_url_enabled,
            webpush_redirect_url,
            email_smtp,
            email_port,
            email_login,
            email_password,
            email_sender_name,
            email_sender_email,
            email_template,
            sms_provider,
            sms_login,
            sms_password,
        } = input

        const applicationConfiguration = new ApplicationConfiguration(
            webpush_website_name!,
            webpush_website_url!,
            webpush_website_image!,
            webpush_permisson_text!,
            webpush_permisson_allow_button_text!,
            webpush_permisson_deny_button_text!,
            webpush_welcome_title!,
            webpush_welcome_text!,
            webpush_redirect_url_enabled!,
            webpush_redirect_url!,
            email_smtp!,
            email_port!,
            email_login!,
            email_password!,
            email_sender_name!,
            email_sender_email!,
            email_template!,
            sms_provider!,
            sms_login!,
            sms_password!,
            id!,
        )

        return this.applicationConfigurationRepository.update(applicationConfiguration)
    }

}
