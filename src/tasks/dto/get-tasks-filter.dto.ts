import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task.status-enum";

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;//Optional (?)
    @IsOptional()
    @IsNotEmpty()
    search?:string; //Optional (?)
}