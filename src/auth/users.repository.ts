import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{
    async createUser(authCredentialDto:AuthCredentialsDto):Promise<void>{//Does not work
        const {username, password}= authCredentialDto;//Does not work
        const user = this.create({username,password})//Does not work
        await this.save(user)//Does not work
    }
}