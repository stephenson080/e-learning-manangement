import Course from "../models/course";
import Department from "../models/department";
import Level from "../models/level";
import User from "../models/user.model";

import { AssignStaffCourseDto, CreateStaffDto, CreateUserDto } from "../utils/dtos/userDtos";
import { encryptPassword } from "../utils/helpers";
import { Role } from "../utils/types";

export default class UserService {
  async createUser(createUserDto: CreateUserDto) {
    const existDepartment = await Department.findById(createUserDto.department);
    if (!existDepartment) throw new Error("Department not found");
    const existLevel = await Level.findById(createUserDto.level);
    if (!existLevel) throw new Error("Level not found");

    const existUser = await this.getUser("regNo", createUserDto.regNo);
    if (existUser) throw new Error("User already Exit with Reg No");

    // encrypt password
    let password = await encryptPassword(createUserDto.password);

    const newUser = new User({
      name: createUserDto.name,
      department: createUserDto.department,
      level: createUserDto.level,
      password,
      regNo: createUserDto.regNo,
      role: createUserDto.role
    });
    await newUser.save();
  }

  async createStaff(createStaffDto: CreateStaffDto) {
    const existDepartment = await Department.findById(
      createStaffDto.department
    );
    if (!existDepartment) throw new Error("Department not found");
    const existLevel = await Level.findById(createStaffDto.level);
    if (!existLevel) throw new Error("Level not found");

    const existUser = await this.getUser("regNo", createStaffDto.regNo);
    if (existUser) throw new Error("User already Exit with Reg No");

    // encrypt password
    let password = await encryptPassword("STAFF111");

    const newUser = new User({
      name: createStaffDto.name,
      department: createStaffDto.department,
      level: createStaffDto.level,
      password,
      regNo: createStaffDto.regNo,
      role: Role.STAFF,
    });
    await newUser.save();
  }

  async getUser(key: string, value: string) {
    return await User.findOne({ [key]: value }).populate(["department", "level", "courses"]);
  }

  async assignStaffCourse(assignStaffCourseDto : AssignStaffCourseDto){
    const staff = await this.getUser('_id', assignStaffCourseDto.staff)
    if (!staff) throw new Error('Staff not found!')
    const course = await Course.findOne({_id: assignStaffCourseDto.course})
    if (!course) throw new Error('Course not Found')

    if (!staff.courses){
      const _courses = [course._id]
      staff.courses = [..._courses]
      await staff.save()
    }

    const _courses = [...staff.courses]
    const existCourse = _courses.find(c => c._id.toString() === course._id.toString())
    if (existCourse) throw new Error('Course Already Assigned to Staff')
    _courses.push(course._id)
    staff.courses = [..._courses]
    await staff.save()

  }

  async getAllUsers(role?: Role) {
    if (!role){
      return await User.find().populate(["department", "level", "courses"]);
    }
    return await User.find({role}).populate(["department", "level", "courses"]);
  }

  async getUsersBy(key: string, value: string) {
    return await User.find({[key]: value}).populate(["department", "level", "courses"]);
  }
}
