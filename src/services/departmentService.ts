
import Department from "../models/department";

import { CreateDepartmentDto } from "../utils/dtos/departmentDto";
// import Level from "../models/level";
// import User from "../models/user.model";
// import { CreateUserDto } from "../utils/dtos/userDtos";

export default class DepartmentService {
    async createDepartment(createDepartmentDto: CreateDepartmentDto){
        const existDepartment = await this.getDepartment('code', createDepartmentDto.code)
        if (existDepartment) throw new Error('Department Already Exist')
        const newDepartment = new Department({code: createDepartmentDto.code, name: createDepartmentDto.name})
        await newDepartment.save()
    }
    async getDepartment(key: string, value: string){
        return await Department.findOne({[key]: value})
    }
    async getAllDepartment(){
        return await Department.find()
    }
}