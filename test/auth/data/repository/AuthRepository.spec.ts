import mongoose from "mongoose";
import AuthRepository from "../../../../src/auth/data/repository/AuthRepository";
import dotenv from "dotenv";
import chai, { expect } from 'chai'


dotenv.config()


describe('AuthRepository', () => {
    let client: mongoose.Mongoose
    let sut: AuthRepository

    beforeEach(() => {
        client = new mongoose.Mongoose();
        const connectionStr = encodeURI(process.env.TEST_DB as string);
        client.connect(connectionStr);
        sut = new AuthRepository(client);
    });
    afterEach(() => {
        client.disconnect();
    });
    it('should return user when email is found', async function name() {
        const email = 'mail@mail.com'
        const password = 'pass'

        //action
        const result = await sut.find(email);

        //assert
        expect(result).to.not.be.empty;

    });
    it('should return user id when added to db', async function name() {
        const user = {
            name: 'John Flynn',
            email: 'Flyn@mail.com',
            password: 'pass232',
            type: 'email',
        }

        //action
        const result = await sut.add(user.name, user.email, user.password, user.type);

        //assert
        expect(result).to.not.be.empty;

    });

});


