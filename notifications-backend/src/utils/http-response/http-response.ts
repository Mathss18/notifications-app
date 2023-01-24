import { HttpResponseInterface } from "./http-response-interface";

export class HttpReturn {
    constructor() {

    }

    public static build({ success, data, message }: HttpResponseInterface) {
        return {
            success: success ?? true,
            data: data ?? {},
            message: message ?? ''
        }
    }
}