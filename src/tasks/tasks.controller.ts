import {  Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards,} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/uptade-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';


@Controller('tasks') //This controller will handle all requests on root/tasks
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {} //This is how TasksService is injected//What this line does? taskService parameter will be used as a private property of this TasksController. //and because this is provate property we can use this as this.tasksService.someFunction(); in our class
 
  @Get()
 getTasks(filterDto:GetTasksFilterDto):Promise<Task[]>{
  return this.tasksService.getTasks(filterDto)
 }

  @Get('/:id')
  getTaskByID(@Param('id') id:string):Promise<Task>{
    return this.tasksService.getTaskByID(id)
  }

  @Delete('/:id')
  removTaskByID(@Param('id') id: string):Promise<void>{
    return this.tasksService.deleteTaskById(id)
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @GetUser()user:User): Promise<Task> {//return promise of task
    //Takes all body, looks for 'title' and 'description'
    return this.tasksService.createTask(createTaskDto, user); //Receives body described in DTO as a paramewter which is from @body decorator
  }

  @Patch('/:id/status')
    async UpdateTaskStatus(@Param('id') id:string,@Body() updateTaskStatusDto: UpdateTaskStatusDto):Promise<Task>{
      const {status} = updateTaskStatusDto;
      return this.tasksService.updateTaskStatus(id, status)
    }
  }

  // @Get()
  // getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
  //   if(Object.keys(filterDto).length){//If any filter applied run function getTasksWithFilters
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks() 
  //   }
  // }



 // @Get('/:id') // if we put :id inside @Get() it knows it is going to be path patameter which we can extract from parameter of the handler getTaskByID(@Param('id')
  // getTaskByID(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskByID(id);
  // }

    // @Delete('/:id')
  // deleteTaskByID(@Param('id') id: string) {
  //   return this.tasksService.deleteTaskByID(id);
  // }

    // @Patch('/:id/status') //There is no need to put : after id/ again. it was given in /:id
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto, //we search for status specifictly in our request Body, Here we use our Dto for that
  //   ): Task {
  //   const {status} = updateTaskStatusDto
  //   return this.tasksService.updateTaskStatus(id, status);
  // }