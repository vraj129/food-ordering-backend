import ITokenService from "../services/ITokenService";
import SignInUseCase from "../usecases/SignInUseCase";
import * as express from "express";
import SignUpUseCase from "../usecases/SignUpUseCase";
import SignOutUseCase from "../usecases/SignOutUseCase";

export default class AuthController {
    private readonly signInUseCase: SignInUseCase;
    private readonly signUpUseCase: SignUpUseCase;
    private readonly tokenService: ITokenService;
    private readonly signOutUseCase: SignOutUseCase;

    constructor(signInUseCase: SignInUseCase,
        signUpUseCase: SignUpUseCase,
        signOutUseCase: SignOutUseCase,
        tokenService: ITokenService) {
        this.signInUseCase = signInUseCase;
        this.tokenService = tokenService;
        this.signUpUseCase = signUpUseCase;
        this.signOutUseCase = signOutUseCase;
    }

    public async signin(req: express.Request, res: express.Response) {
        try {
            const { name, email, password, auth_type } = req.body;
            return this.signInUseCase.execute(name, email, password, auth_type)
                .then((id: string) => res.status(200).json({ auth_token: this.tokenService.encode(id) })
                ).catch((err: Error) => res.status(404).json({ error: err.message }))
        }
        catch (err) {
            return res.status(400).json({ error: err });
        }
    }

    public async signup(req: express.Request, res: express.Response) {
        try {
            const { name, email, password, auth_type } = req.body;
            return this.signUpUseCase.execute(name, auth_type, email, password)
                .then((id: string) => res.status(200).json({ auth_token: this.tokenService.encode(id) })
                ).catch((err: Error) => res.status(404).json({ error: err.message }))
        }
        catch (err) {
            return res.status(400).json({ error: err });
        }
    }

    public async signout(req: express.Request, res: express.Response) {
        try {
            const token = req.headers.authorization!;
            return this.signOutUseCase
                .execute(token)
                .then((result) => res.status(200).json({ message: result }));
        }
        catch (err) {
            return res.status(400).json({ error: err });
        }
    }
}