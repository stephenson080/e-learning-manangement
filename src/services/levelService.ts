// import Department from "../models/department";
import Level from "../models/level";
// import User from "../models/user.model";
// import { CreateUserDto } from "../utils/dtos/userDtos";

export default class LevelService {
    

    async getAllLevels(){
        return await Level.find()
    }
}