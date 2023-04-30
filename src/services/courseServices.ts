import Course from "../models/course";
import Department from "../models/department";
import Level from "../models/level";
import Semester from "../models/semester";

import { CreateCourseDto, GetCoursesDto } from "../utils/dtos/courseDtos";

export default class CourseService {
  async createCourse(createCourseDto: CreateCourseDto) {
      console.log(createCourseDto)
    const existDepartment = await Department.findById(createCourseDto.department);
    if (!existDepartment) throw new Error("Department not found");
    const existLevel = await Level.findById(createCourseDto.level);
    if (!existLevel) throw new Error("Level not found");
    const existSemester = await Semester.findById(createCourseDto.semester);
    if (!existSemester) throw new Error("Semester not found");

    // const {name, code, department, level, semester} = createCourseDto
    const existCourse = await this.getCourse('code', createCourseDto.code)
    if (existCourse) throw new Error('Coursee Already with Code')
    const newCourse = new Course(createCourseDto)
    await newCourse.save()
  }

  async getCourse(key: string, value: string){
      return await Course.findOne({[key]: value})
  }

  async getCoursesWithCriteria(getCoursesDto: GetCoursesDto){
    return await Course.find(getCoursesDto).populate(['department', 'semester', 'level'])
  }
}
