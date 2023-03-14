import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){//We create strategy for JwT
    constructor(
        @InjectRepository(User)//Inject UserRepositiry
        private userRepository:UsersRepository
    ){
        super({//To make it work we need to call super function. 
            secretOrKey:'topsecret51',//We inform what is secret to allow it checking
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()})//We know where we will receive token and inform it will be bearer token
    }

    async validate(payload:JwtPayload):Promise<User>{//We use validate function with payload as argument
        const {username} = payload //We assing payload to object called {username}
        const user:User = await this.userRepository.findOne({username});//We create constant user and assign it to user 
                                                                        //from DB with same name we have in payload

        if(!user){//If there is no sich user in DB we throw and error
            throw new UnauthorizedException()
        }
        return user;//When we return user passport will inject this user to request object of our controller so we always have access to it

    }

}