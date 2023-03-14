//FOR DB
import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true})//We set validation where value in column has to be unique. Username can not be same for many users
    username:string;

    @Column()
    password:string;

    @OneToMany((_type)=>Task, (task) => task.user,{eager:true})
    tasks:Task[]
}
//One user to many tasks
//OneToMany used to create task ownership @OneToMsny decoraator has 3 arguments 
// 1) Error function that is a type of that property (Task entity) - _type=>Taks,
// 2) How do we access that user from the other side of this relation(from tasks side)-task => task.user,
// 3) Property eager:true. Whenever we fetch user we fetch tasks with it 
