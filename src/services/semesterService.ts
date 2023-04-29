// import Department from "../models/department";
import Level from "../models/level";
// import User from "../models/user.model";
import Semester from "../models/semester";
// import { CreateUserDto } from "../utils/dtos/userDtos";

export default class SemesterService {
    

    async getAllSemesters(){
        return await Semester.find()
    }
}