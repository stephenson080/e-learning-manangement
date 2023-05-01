import { Role } from "../types";

export interface CreateUserDto {
    name: string;
    regNo: string;
    password: string
    level: string
    department: string
    role: Role
}

export interface CreateStaffDto {
    name: string;
    regNo: string;
    level: string
    department: string
}

export interface AssignStaffCourseDto {
    staff: string;
    course: string;
}

export interface LoginUserDto {
    regNo: string;
    password: string
}