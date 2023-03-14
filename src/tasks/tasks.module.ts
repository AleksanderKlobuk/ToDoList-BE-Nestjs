import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';


@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([Task])],//In tutorial they use here TaskRepository. Does not work for me
  controllers: [TasksController],
  providers: [TasksService]//Provider allows TaskService to be injected if TaskService has injavtable decorator
})
export class TasksModule {}
