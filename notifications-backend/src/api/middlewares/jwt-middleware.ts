import { NextFunction, Request, Response } from "express";
import { JwtService } from "../services/jwt-service";

export class JwtMiddleware {

    public static async verify(req: any, res: Response, next: NextFunction) {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).end();
        }
        if (!process.env.JWT_SECRET) {
            return res.status(500).end();
        }
        const jwtService = new JwtService()
        const payload: any = jwtService.verifyToken(token);

        if (payload) {
            req.userId = payload.userId;
            next();
            return;
        }

        return res.status(401).end();
    }
}