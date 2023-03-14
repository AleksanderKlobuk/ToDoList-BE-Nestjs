import { Injectable, NotFoundException } from '@nestjs/common';
//import { v4 as randomuuid } from 'uuid';      -- We do not use uuid here anymore as we use it in task entity during generating task in DBB
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.status-enum';
import { Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { User } from 'src/auth/user.entity';


@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task)
    private taskRepository:TasksRepository){}//Before was :Repository<Task> and worked  -instead :TasksRepository

  async getTasks(filterDto:GetTasksFilterDto):Promise<Task[]>{
    const query = this.taskRepository.createQueryBuilder()//check how it works. If I put something else than task it also works & when I leave this empty it also works
    const tasks = await query.getMany()
    return tasks;

  }

  async getTaskByID(id:string):Promise<Task>{
    const found = await this.taskRepository.findOne(id);//findOne is from TypeOrm documentation

    if (!found) {
      throw new NotFoundException(`Task with id: ${id} was not found`)
    }
    return found 
  }

  async deleteTaskById (id:string):Promise<void>{
    const removed = await this.taskRepository.delete(id)
    if(removed.affected == 0){
      throw new NotFoundException(`Task ${id} not found in DB`)
    }
    console.log(removed)
  }

  async updateTaskStatus(id:string, status:TaskStatus):Promise<Task>{
    const task = await this.getTaskByID(id)
    task.status = status;

    await this.taskRepository.save(task)  
    return task;
  } 

  async createTask(createTaskDto:CreateTaskDto, user:User):Promise<Task>{
    const {title,description} = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status:TaskStatus.OPEN,
      user,
    })

    await this.taskRepository.save(task)
    return task;
  }
}




  // createTask(createTaskDto: CreateTaskDto): Task {
  //   //single task, not in array in case of creation of one task
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     //First we set the body of our post which has to be in line with task.model.ts
  //     id: randomuuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task); // We add task to our tasks array
  //   return task;
  // }


  // getTaskByID(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id); // we have task received and if task.id equals id in tasks then it returns it

  //   if(!found){
  //     throw new NotFoundException(`There is no task attached to provided task ID:${id} `)//Exception if found is not true. Our comment also provides ID wjhich was not found
  //   }
  //   return found
  // }

  // deleteTaskByID(id: string): void {
  //   const found = this.getTaskByID(id)//We get task by ID and assign it to found
  //   //RETURN TYPE is void because there is nothing going to be returned (it is going to be deleted)
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id); //  Filter array with id's not similar I provided and we assign filter to our array which means we have new array
  // }

   // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskByID(id);
  //   task.status = status;
  //   return task;
  // }

    // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto:GetTasksFilterDto):Task[] {
  //   const {status, search} = filterDto;

  //   let tasks = this.getAllTasks();

  //   if (status){
  //     tasks = tasks.filter((task)=> task.status === status);
  //   }

  //   if (search){
  //     tasks = tasks.filter((task)=> {
  //       if (task.title.toLowerCase().includes(search) || task.description.includes(search)){
  //         return ;
  //       }
  //       return false
  //     })
  //   }
  //   return tasks;
  // }
