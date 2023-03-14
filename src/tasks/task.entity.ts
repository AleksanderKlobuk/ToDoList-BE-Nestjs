//THIS IS ENTITY FOR OUR DATABASE
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.status-enum";

@Entity()//This decorator tells this is database Entity
export class Task {
    @PrimaryGeneratedColumn('uuid')//This decorator generaats random id for our id column. If there was no 'uuid' as an argument it would be just 1,2,3 sequence
    id: string;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status:TaskStatus;

    @ManyToOne((_type)=> User, (user) => user.tasks, {eager:false})
    user: User


}

//ManyToOne - many tasks to one user
//ManyToOne used to create task ownership @ManyToOne decoraator has 3 arguments 
// 1) Error function that is a type of that property (Task entity) - (_type)=> User
// 2) How do we access that user from the other side of this relation(from tasks side)-(user) => user.tasks,
// 3) Property {eager:false} We do not fetch user all the time we fetch task