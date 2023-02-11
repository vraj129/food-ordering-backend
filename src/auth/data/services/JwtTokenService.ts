import ITokenService from "../../services/ITokenService";
import jwt from "jsonwebtoken";

export default class JwtTokenService implements ITokenService {

    constructor(private readonly privateKey: string) {

    }
    encode(payload: string | object): string | object {
        let token = jwt.sign({ data: payload }, this.privateKey, {
            issuer: 'com.foodapp',
            expiresIn: '1h',
            algorithm: 'HS256'
        })
        return token;
    }
    decode(token: string): string | object {
        try {
            const decoded = jwt.verify(token, this.privateKey);
            return decoded;
        } catch (err) {
            return '';
        }
    }

}