import 'mocha';
import chai, { expect } from 'chai'
import SignInUseCase from '../../../src/auth/usecases/SignInUseCase';
import IAuthRepository from '../../../src/auth/domain/IAuthRepository';
import IPasswordService from '../../../src/auth/services/IPasswordService';
import FakeRepository from '../helpers/FakeRepository';
import FakePasswordService from '../helpers/FakePasswordService';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('SignInUseCase', () => {
    let sut: SignInUseCase;
    let authRepository: IAuthRepository;
    let passwordService: IPasswordService;

    const user = {
        email: 'baller@gg.com',
        id: '1234',
        name: 'Ken',
        password: '$2b$10$K0HEqyYUlQLaj.Xkp9tDzuRclzJqdKCYV7gEHtSVIlu8NRtLM6flC',
        type: 'email',
    }
    beforeEach(() => {
        authRepository = new FakeRepository();
        passwordService = new FakePasswordService();
        sut = new SignInUseCase(authRepository, passwordService);
    });
    it('should throw error when user is not found', async () => {
        const user = { email: 'wrong@email.com', password: "1234", };

        //assert
        await expect(sut.execute(user.email, user.password)).to.be.rejectedWith('User not found');
    });

    it('should return user id when email and password is correct', async () => {
        //act 
        const id = await sut.execute(user.email, user.password);

        //assert
        expect(id).to.be.equal(user.id);
    });

    it('should return user id when email is correct and type is email', async () => {
        //act 
        const id = await sut.execute(user.email, '');

        //assert
        expect(id).to.be.equal(user.id);
    });
});