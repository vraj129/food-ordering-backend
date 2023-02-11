import IAuthRepository from "../domain/IAuthRepository";
import IPasswordService from "../services/IPasswordService";

export default class SignUpUseCase {
    constructor(private authRepository: IAuthRepository,
        private passwordService: IPasswordService,
    ) { }

    public async execute(
        name: string,
        authType: string,
        email: string,
        password: string,
    ): Promise<string> {
        const user = await this.authRepository.find(email).catch((_) => null);
        if (user) return Promise.reject('User already exist');
        let passwordhash;
        if (password) {
            passwordhash = await this.passwordService.hash(password);
        }
        else {
            passwordhash = undefined;
        }

        const userId = await this.authRepository.add(
            name,
            email,
            authType,
            passwordhash,
        );
        return userId;
    }
}