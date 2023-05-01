import { Request, Response } from "express";


import DepartmentService from "../services/departmentService";
import LevelService from "../services/levelService";
import SemesterService from "../services/semesterService";
import UserService from "../services/userServices";
import CourseService from "../services/courseServices";
import MaterialService from "../services/materialServices";

import { AssignStaffCourseDto, CreateStaffDto, CreateUserDto, LoginUserDto } from "../utils/dtos/userDtos";
import { CreateDepartmentDto } from "../utils/dtos/departmentDto";
import { CreateCourseDto, GetCoursesDto } from "../utils/dtos/courseDtos";
import { Role } from "../utils/types";

// import { decryptPassword, trimUser } from "../utils/helpers";
// import { Role } from "../utils/types";

const semesterService = new SemesterService();
const departmentService = new DepartmentService();
const levelService = new LevelService();
const userService = new UserService();
const courseService = new CourseService()
const materialServices = new MaterialService()

export async function getIndexPage(req: Request, res: Response) {
  try {
    // const _query = req.query;
    const users = await userService.getAllUsers()
    const levels = await levelService.getAllLevels();
    const departments = await departmentService.getAllDepartment();
    res.render("admin/index", {
      path: "users",
      docTitle: "Admin",
      isLoggedIn: true,
      admin: true,
      staff: false,
      user: false,
      staffs: users.filter(u => u.role === Role.STAFF),
      students: users.filter(u => u.role === Role.USER),
      departments,
      levels,
      token: req.query.token ? req.query.token : ''
    });
  } catch (error: any) {
    res.render("auth/login", {
      path: "/login",
      docTitle: "Login",
      errorMessage: error.message,
      error: true,
      isLoggedIn: false,
      admin: false,
      staff: false,
      user: false,
      token: ''
    });
  }
}

export async function addStaff(req: Request, res: Response){
  try {
    const body: CreateStaffDto = req.body;
    await userService.createStaff(body)
    res.json({
      status: true,
      message: 'Staff Added!'
    });
  } catch (error: any) {
    res.json({
      status: false,
      message: error.message
    });
  }
}

export async function getDepartmentPage(req: Request, res: Response) {
  const departments = await departmentService.getAllDepartment();
  res.render("admin/departments", {
    path: "departments",
    docTitle: "Departments",
    error: false,
    isLoggedIn: true,
    admin: true,
    staff: false,
    user: false,
    departments,
    token: req.query.token ? req.query.token : ''
  });
}

export async function addDepartment(req: Request, res: Response){
  try {
    const body: CreateDepartmentDto = req.body;
    await departmentService.createDepartment(body)
    res.json({
      status: true,
      message: 'Department Added!'
    });
  } catch (error: any) {
    res.json({
      status: false,
      message: error.message
    });
  }
}

export async function getCoursesPage(req: Request, res: Response) {
  const staffs = await userService.getAllUsers(Role.STAFF)
  const departments = await departmentService.getAllDepartment();
  const levels = await levelService.getAllLevels()
  const semesters = await semesterService.getAllSemesters()
  res.render("admin/courses", {
    path: "courses",
    docTitle: "Courses",
    error: false,
    isLoggedIn: true,
    admin: true,
    staff: false,
    user: false,
    departments,
    levels,
    semesters,
    staffs,
    token: req.query.token ? req.query.token : ''
  });
}

export async function addCourse(req: Request, res: Response){
  try {
    const body: CreateCourseDto = req.body;
    await courseService.createCourse(body)
    res.json({
      status: true,
      message: 'Course Added!'
    });
  } catch (error: any) {
    res.json({
      status: false,
      message: error.message
    });
  }
}

export async function getCoursesWithCriteria(req: Request, res: Response){
  try {
    
    const body: any = {semester: req.query.semester, level: req.query.level, department: req.query.department}
    const courses = await courseService.getCoursesWithCriteria(body)

    res.json({
      status: true,
      courses
    });
  } catch (error: any) {
    res.json({
      status: false,
      message: error.message
    });
  }
}

export async function assignUserCourse(req: Request, res: Response){
  try {
    
    const body: AssignStaffCourseDto = req.body
    await userService.assignStaffCourse(body)

    res.json({
      status: true,
      message: 'Course Assigned to Staff!'
    });
  } catch (error: any) {
    res.json({
      status: false,
      message: error.message
    });
  }
}

export async function addCourseMaterial(req: Request, res: Response){
  try {
    if (!req.file) throw new Error('No File uploaded')
    await materialServices.addMaterial({url: req.file.filename, course: req.body.course})
    res.json({
      status: true,
      message: 'Material Added!'
    });
  } catch (error: any) {
    res.json({
      status: false,
      message: error.message
    });
  }
}
