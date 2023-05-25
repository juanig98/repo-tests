import { User } from "../models/User.entity";
import { dataSourceConnection } from "../server";

export class UserController {



    async getByUsername(username: string): Promise<User> {
        const repo = dataSourceConnection.getRepository(User)

        return await repo.findOne({ where: { username, status: 'A' } })
    }
    async getByUsernamePassword(username: string, password: string): Promise<User> {
        const repo = dataSourceConnection.getRepository(User)

        return await repo.findOne({ where: { username, password, status: 'A' } })
    }

}