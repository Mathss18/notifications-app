import jwt, { SignOptions } from 'jsonwebtoken';

export class JwtService {

    constructor() { }

    public generateToken(payload: string | object | Buffer, options?: SignOptions): string {
        if (!process.env.JWT_SECRET) throw new Error('JWT Secret no defined.')

        return jwt.sign(payload, process.env.JWT_SECRET, options);
    }

    public verifyToken(token: string): object | null {
        if (!process.env.JWT_SECRET) throw new Error('JWT Secret no defined.');
        let response = null;
        jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
            if (error) {
                response = null
                return
            }
            response = payload
        });
        return response
    }
}