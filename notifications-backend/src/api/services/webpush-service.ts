import webpush from 'web-push';
import { ApplicationConfigurationService } from './application-configuration-service';

export class WebPushService {
    private publicKey: string
    private privateKey: string

    constructor() {
        this.generateVapiKeys();
    }

    public send(payload: INotificationPayload, receiver: any): Promise<webpush.SendResult> {
        return webpush.sendNotification(JSON.parse(receiver), JSON.stringify(payload));
    }

    public async generateBundle(applicationId: number): Promise<string> {
        const applicationConfigurationService = new ApplicationConfigurationService()
        const config = await applicationConfigurationService.findByApplicationId(applicationId)
        if (!config)
            throw new Error('Configuração não encontrada.')

        const WEBPUSH_SUBSCRIBE_URL = `http://146.190.115.151/api/webpush-audience/${applicationId}`;
        const WEBPUSH_SUBSCRIBE_KEY = process.env.PUBLIC_KEY;

        const boostrapCss = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css">`;
        const jqueryJs = `<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>`;
        const boostrapJs = `<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js"></script>`;

        const modal = `document.write('<div class="modal" tabindex="-1" role="dialog" id="notificationModal"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><h3 class="modal-title">Quer receber notificações de ${config.webpush_website_name}?</h3></div><div class="modal-body"><div class="row"><div class="col-2"><img src="${config.webpush_website_image}" width="120" height="120" /></div><div class="col-10"><p>${config.webpush_permisson_text}</p></div></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">${config.webpush_permisson_deny_button_text}</button><button type="button" class="btn btn-primary" onclick="askForPermision();">${config.webpush_permisson_allow_button_text}</button></div></div></div></div>');`;
        const functions = `function handlePermission(){return navigator.permissions.query({name:"notifications"}).then(permissionQuery).catch(permissionError)}function permissionQuery(e){var i;return console.debug({result:e}),"granted"==e.state||("prompt"==e.state?$("#notificationModal").modal("toggle"):e.state),e.onchange=()=>console.debug({updatedPermission:e}),i||e}function askForPermision(){newPrompt=Notification.requestPermission(()=>subscribe()),$("#notificationModal").modal("toggle")}async function subscribe(){let e=await (await navigator.serviceWorker.ready).pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:"${WEBPUSH_SUBSCRIBE_KEY}"});console.log(JSON.stringify(e)),fetch("${WEBPUSH_SUBSCRIBE_URL}",{mode:'cors',method:"POST",body:JSON.stringify(e),headers:{Accept:"application/json","Content-Type":"application/json"}}).then(e=>e.text()).then(e=>console.log(e))}"serviceWorker"in navigator&&addEventListener("load",async()=>{let e=await navigator.serviceWorker.register("./sw.js");console.log(e)}),handlePermission();`;

        const bundle = `${boostrapCss} ${jqueryJs} ${boostrapJs}<script>${modal} ${functions}</script>`

        return bundle;
    }

    private generateVapiKeys() {
        if (!process.env.PUBLIC_KEY || !process.env.PRIVATE_KEY) {
            const vapidKeys = webpush.generateVAPIDKeys();
            console.log('Add publicKey and privateKey to your .env', { privateKey: vapidKeys.privateKey, publicKey: vapidKeys.publicKey })
            return
        }
        this.publicKey = process.env.PUBLIC_KEY;
        this.privateKey = process.env.PRIVATE_KEY;
        this.setVapidDetails();
    }

    private setVapidDetails() {
        webpush.setVapidDetails(
            'mailto:example@yourdomain.org',
            this.publicKey,
            this.privateKey
        );
    }

}
interface INotificationPayload {
    title?: string;
    body?: string
    icon?: string
    tag?: string
    actions?: IAction[]
    data?: { url: string }
}

interface IAction {
    action: 'view' | 'close';
    title: string
}