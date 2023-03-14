import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports:[
    PassportModule.register({defaultStrategy: 'jwt'}),//Add passport with jwt strategy
    JwtModule.register({//Import JWT and set secret and ecpiration time for 1 hour (3600 sec)
      secret:'topsecret51',
      signOptions:{expiresIn:3600}
    }),
    TypeOrmModule.forFeature([User])],//For some reason userrepository does not work here
  providers: [AuthService, JwtStrategy],//These will be avalible within module
  controllers: [AuthController],
  exports:[JwtStrategy, PassportModule]//We export these to make them avalible for other modules that going to import AuthModule
})
export class AuthModule {}
