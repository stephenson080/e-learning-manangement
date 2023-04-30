export interface CreateCourseDto {
    name: string;
    code: string;
    department: string
    level: string
    semester: string
}

export interface GetCoursesDto {
    department: string
    level: string
    semester: string
}