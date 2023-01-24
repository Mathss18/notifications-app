import express, { Request, Response } from 'express'
import { Notification } from '../../domain/entities/notifications/Notification'
import { HttpStatusCode } from '../../enums/http-status-code'
import { HttpReturn } from '../../utils/http-response/http-response'
import { ApplicationConfigurationController } from '../controllers/application-configuration-controller'
import { ApplicationController } from '../controllers/application-controller'
import { AuthController } from '../controllers/auth-controller'
import { NotificationsController } from '../controllers/notification-controller'
import { UserController } from '../controllers/user-controlle'
import { WebpushAudienceController } from '../controllers/webpush-audience-controller'
import { JwtMiddleware } from '../middlewares/jwt-middleware'
import { EmailService } from '../services/email-service'
import { JwtService } from '../services/jwt-service'
import { WebPushService } from '../services/webpush-service'

export const router = express.Router()

router.get('/', JwtMiddleware.verify, (req: Request, res: Response) => {
    res.status(HttpStatusCode.Ok).json(HttpReturn.build({ data: process.env.HOSTNAME }))
})

/* ======= Auth Routes ========= */
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const authController = new AuthController(new JwtService());
        const token = await authController.authenticate({ email, password })
        if (!token)
            throw new Error('Não autorizado.');
        res.status(HttpStatusCode.Ok).json(HttpReturn.build({ data: { token } }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }

})
'   '
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        const userController = new UserController()
        const user = await userController.create({ name, email, password })
        res.status(HttpStatusCode.Created).json(HttpReturn.build({ data: { user } }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }
})

/* ======= Applications ========= */
router.get('/applications', JwtMiddleware.verify, async (req: any, res: Response) => {
    try {
        const applicationController = new ApplicationController()
        const applications = await applicationController.findAllByUserId(req.userId);
        if (!applications)
            throw new Error('Não foi possível trazer as aplicações.');
        res.status(HttpStatusCode.Ok).json(HttpReturn.build({ data: { applications } }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }
})

router.post('/applications', JwtMiddleware.verify, async (req: any, res: Response) => {
    try {
        const { name, webpush, email, sms } = req.body
        const applicationController = new ApplicationController()
        const application = await applicationController.create({ name, webpush, email, sms, userId: req.userId });
        if (!application)
            throw new Error('Não foi possível criar a aplicação.');
        res.status(HttpStatusCode.Created).json(HttpReturn.build({ data: { application } }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }
})

/* ======= Applications Configurations ========= */
router.get('/applications-configurations/:id', JwtMiddleware.verify, async (req: Request, res: Response) => {
    try {
        const { id }: any = req.params
        const applicationConfigurationController = new ApplicationConfigurationController()
        const applicationConfiguration = await applicationConfigurationController.findOne(id);
        if (!applicationConfiguration)
            throw new Error('Não foi possível encontrar a configuração.');
        res.status(HttpStatusCode.Ok).json(HttpReturn.build({ data: { applicationConfiguration } }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }
})

router.get('/applications-configurations/application-id/:applicationId', JwtMiddleware.verify, async (req: Request, res: Response) => {
    try {
        const { applicationId }: any = req.params
        const applicationConfigurationController = new ApplicationConfigurationController()
        const applicationConfiguration = await applicationConfigurationController.findByApplicationId(applicationId);
        if (!applicationConfiguration)
            throw new Error('Não foi possível encontrar a configuração.');
        res.status(HttpStatusCode.Ok).json(HttpReturn.build({ data: { applicationConfiguration } }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }
})

router.post('/applications-configurations', JwtMiddleware.verify, async (req: Request, res: Response) => {
    try {
        const {
            applicationId,
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
        } = req.body
        const applicationConfigurationController = new ApplicationConfigurationController()
        const applicationConfiguration = await applicationConfigurationController.create({
            applicationId,
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
        });
        if (!applicationConfiguration)
            throw new Error('Não foi possível criar a configuração.');
        res.status(HttpStatusCode.Created).json(HttpReturn.build({ data: { applicationConfiguration } }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }
})

router.put('/applications-configurations/:configId', JwtMiddleware.verify, async (req: Request, res: Response) => {

    const { configId }: any = req.params
    try {
        const {
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
        } = req.body
        const applicationConfigurationController = new ApplicationConfigurationController()
        const applicationConfiguration = await applicationConfigurationController.update({
            id: configId,
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
        });
        if (!applicationConfiguration)
            throw new Error('Não foi possível atualizar a configuração.');
        res.status(HttpStatusCode.Created).json(HttpReturn.build({ data: { applicationConfiguration } }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }
})

/* ======= Webpush ========= */
router.get('/webpush-audience/:applicationId', async (req: Request, res: Response) => {
    try {
        const { applicationId }: any = req.params
        const webpushAudienceController = new WebpushAudienceController()
        const audience = await webpushAudienceController.findAllByApplicationId(applicationId);
        if (!audience)
            throw new Error('Não foi possível encontrar a audiencia.')
        res.status(HttpStatusCode.Ok).json(HttpReturn.build({ data: { audience } }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }

})

router.post('/webpush-audience/:applicationId', async (req: Request, res: Response) => {
    const { applicationId }: any = req.params
    const json = req.body
    const webpushAudienceController = new WebpushAudienceController()
    webpushAudienceController.create({ applicationId, json: JSON.stringify(json) })
    res.status(HttpStatusCode.Ok).json(HttpReturn.build({ data: 'created' }))
})

router.post('/webpush-bundle', JwtMiddleware.verify, async (req: Request, res: Response) => {
    const webpushService = new WebPushService()
    try {
        const { applicationId } = req.body
        const bundle = await webpushService.generateBundle(applicationId);
        res.status(HttpStatusCode.Ok).json(HttpReturn.build({ data: { bundle } }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }
})

router.post('/webpush-send', JwtMiddleware.verify, async (req: Request, res: Response) => {
    try {
        const webpushService = new WebPushService()
        const { webpush_title, webpush_message, webpush_link, webpush_image, jsons, applicationId, origin } = req.body
        var actions: any = [
            { "action": "view", "title": "Abrir" },
            { "action": "close", "title": "Fechar" }
        ];
        if (!webpush_link) actions = []; // if no link is provided, then no buttons are necessary

        const responses: any[] = []
        for (const json of jsons) {
            const resp = await webpushService.send({ title: webpush_title, body: webpush_message, icon: webpush_image, tag: '', actions, data: { url: webpush_link } }, json);
            responses.push(resp)
            try {
                storeNotifications(applicationId, 'webpush', origin)
            } catch (error) {

            }


        }
        res.status(HttpStatusCode.Ok).json(HttpReturn.build({ data: responses }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }
})

/* ======= Email ========= */
router.post('/email-send', JwtMiddleware.verify, async (req: Request, res: Response) => {
    try {
        const { applicationId, senderEmails, subject, text, origin } = req.body
        const applicationConfigurationController = new ApplicationConfigurationController();
        const applicationConfiguration = await applicationConfigurationController.findByApplicationId(applicationId);
        const emailService = new EmailService(
            {
                host: applicationConfiguration?.email_smtp,
                port: applicationConfiguration?.email_port,
                user: applicationConfiguration?.email_login,
                email: applicationConfiguration?.email_sender_email,
                password: applicationConfiguration?.email_password
            }
        )
        const response = await emailService.sendEmail(applicationConfiguration?.email_sender_name!, senderEmails, subject, text, applicationConfiguration?.email_template!)
        try {
            storeNotifications(applicationId, 'email', origin)
        } catch (error) {

        }

        res.status(HttpStatusCode.Ok).json(HttpReturn.build({ data: response }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }
})

/* ======= Notifications ========= */
router.get('/notifications/:applicationId', async (req: Request, res: Response) => {
    try {
        const { applicationId }: any = req.params
        const notificationController = new NotificationsController()
        const notifications = await notificationController.findByApplicationId(applicationId)
        res.status(HttpStatusCode.Ok).json(HttpReturn.build({ data: notifications }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }
})

router.post('/notifications/:applicationId', async (req: Request, res: Response) => {
    try {
        const { applicationId }: any = req.params
        const { channel, origin } = req.body
        const notificationController = new NotificationsController()
        const notification = await notificationController.create({ application_id: applicationId, channel, origin })
        res.status(HttpStatusCode.Ok).json(HttpReturn.build({ data: notification }))
    } catch (error: any) {
        res.status(HttpStatusCode.InternalServerError).json(HttpReturn.build({ success: false, message: error.message }))
    }
})

async function storeNotifications(applicationId: number, channel: string, origin: string): Promise<Notification | null> {
    const notificationController = new NotificationsController()
    const notification = await notificationController.create({ application_id: applicationId, channel, origin })
    return notification;
}
