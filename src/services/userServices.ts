
import Department from "../models/department";
import Level from "../models/level";
import User from "../models/user.model";

import { CreateUserDto } from "../utils/dtos/userDtos";
import { encryptPassword } from "../utils/helpers";
import { Role } from "../utils/types";

export default class UserService {
    async createUser(createUserDto: CreateUserDto){
        const existDepartment = await Department.findById(createUserDto.department)
        if (!existDepartment) throw new Error('Department not found')
        const existLevel = await Level.findById(createUserDto.level)
        if (!existLevel) throw new Error('Level not found')

        const existUser = await this.getUser('regNo', createUserDto.regNo)
        if (existUser) throw new Error('User already Exit with Reg No')

        // encrypt password
        let password = await encryptPassword(createUserDto.password)

        const newUser = new User({name: createUserDto.name, department: createUserDto.department, level: createUserDto.level, password, regNo: createUserDto.regNo})
        await newUser.save()
    }

    async getUser(key: string, value: string){
        return await User.findOne({[key]: value})
    }

    async getAllUsers(){
        return await User.find().populate(['department', 'level'])
    }
}