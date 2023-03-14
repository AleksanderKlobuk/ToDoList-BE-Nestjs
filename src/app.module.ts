import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { TasksRepository } from './tasks/task.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule,TasksModule, 
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'postgres',
      database:'task-management',
      autoLoadEntities:true,   
      synchronize:true,
    })],
  controllers: [],

})
export class AppModule {}

/*
I use Docker to run Postgres
 I use pgAdmin.It helps manage and observe our Postgres database
 Connection to DB
 TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'postgres',
      database:'task-management',
      autoLoadEntities:true,
      synchronize:true,
    })
*/