import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('/signup')
    signUp(@Body() authCredentialsDto:AuthCredentialsDto):Promise<User>{
        return this.authService.signUP(authCredentialsDto)
    }
    @Post('/signin')
    signIn(@Body() authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
        return this.authService.signIn(authCredentialsDto)
    }
}

// THIS IS HOW WE COULD DO WITH OLD Ver. of TypeOrm
    // @Post('/signup')
    // signUp(@Body() authCredentialsDto:AuthCredentialsDto):Promise<void>{
    //     return this.authService.signUP(authCredentialsDto)
    // }