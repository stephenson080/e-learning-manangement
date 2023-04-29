export interface CreateUserDto {
    name: string;
    regNo: string;
    password: string
    level: string
    department: string
}

export interface CreateStaffDto {
    name: string;
    regNo: string;
    level: string
    department: string
}

export interface LoginUserDto {
    regNo: string;
    password: string
}