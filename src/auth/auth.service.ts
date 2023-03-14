import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)//UserRepository does not work for some reason
        private userRepository:UsersRepository,//We inject userrepository
        private jwtService:JwtService){}//We inject JwtSerive which is added in auth module by importing JwtModule
        

    async signUP(authCredentialsDto:AuthCredentialsDto):Promise<User>{

        const {username,password} = authCredentialsDto;
        const salt = await bcrypt.genSalt(); //We create salt constant by using bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt) //We create variable hashedPassowrd and we assign hashed password plus generated salt

        const user = this.userRepository.create({
          username,
          password: hashedPassword,
        })
        try{await this.userRepository.save(user)//Sprawdz czy sa errory
          return }
          catch (error){if(error.code === '23505') throw new ConflictException(`This username already EXISTS`)
         }//Zlap error i pokaz 
      }//Try to just console log error so you can see what data it contains. Example error.

      async signIn(authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
        const {username, password} = authCredentialsDto; //Destructure username and password
        const user  = await this.userRepository.findOne({username}) //create constant 'user' and assign it to  username from input
        if (user && ( await bcrypt.compare(password, user.password))){//If user exists we compare if given password is in lin ewith password in DB
          const payload:JwtPayload = {username} // We define payload as object containing username
          const accessToken = await this.jwtService.sign(payload) // We create access token using payload which was set to username
          return {accessToken} //We had to set promise to accessToken:string so it does not camplain on return type
        }
        else throw new UnauthorizedException('Please check username and password')
        
      }
}

// THIS IS HOW WE COULD DO WITH OLD Ver. of TypeOrm
  //async signUP(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        //return this.userRepository.createUser(authCredentialsDto)
    //}
