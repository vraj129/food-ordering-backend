import mongoose from "mongoose";
import AuthRepository from "./auth/data/repository/AuthRepository";
import BcryptPasswordService from "./auth/data/services/BcryptPasswordService";
import JwtTokenService from "./auth/data/services/JwtTokenService";
import AuthRouter from "./auth/entrypoint/AuthRouter";
import redis from "redis";
import RedisTokenStore from "./auth/data/services/RedisTokenStore";
import TokenValidator from "./auth/helpers/TokenValidator";

export default class CompositionRoot {
    private static client: mongoose.Mongoose;
    private static redisClient: redis.RedisClient;

    public static configure() {
        this.client = new mongoose.Mongoose()
        this.redisClient = redis.createClient();
        const connectionStr = encodeURI(process.env.TEST_DB as string);
        this.client.connect(connectionStr);
    }

    public static authRouter() {
        const repository = new AuthRepository(this.client);
        const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string);
        const passwordService = new BcryptPasswordService();
        const tokenStore = new RedisTokenStore(this.redisClient);
        const tokenValidator = new TokenValidator(tokenService, tokenStore);


        return AuthRouter.configure(repository, tokenService, passwordService, tokenStore, tokenValidator);
    }
}