import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);//This line creates backend api app and using AppModule to run it
  app.useGlobalPipes(new ValidationPipe())//This line allows us to use validation Pipes like @IsNotEmpty()
  await app.listen(3000);//Listens in port 3000
}
bootstrap();
