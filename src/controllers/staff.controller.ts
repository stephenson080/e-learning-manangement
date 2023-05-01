import { Request, Response } from "express";

import DepartmentService from "../services/departmentService";
import LevelService from "../services/levelService";
import SemesterService from "../services/semesterService";
import UserService from "../services/userServices";
import CourseService from "../services/courseServices";
import MaterialService from "../services/materialServices";

const semesterService = new SemesterService();
const departmentService = new DepartmentService();
const levelService = new LevelService();
const userService = new UserService();
const courseService = new CourseService();
const materialServices = new MaterialService();

export async function getStaffIndexPage(req: Request, res: Response) {
  try {
    const { level, userId }: any = req.query;
    console.log(level, userId);
    const staff = await userService.getUser("_id", userId);
    if (!staff) throw new Error('Not Authorised')
    const _courses = !staff.courses ? [] : [...staff.courses]
    let assignedCourses = []
    for(let course of _courses){
        const _course = await courseService.getCourse('_id', course._id.toString())
        assignedCourses.push(_course)
    }
    res.render("staff/index", {
      path: "staff",
      docTitle: "Staff",
      isLoggedIn: true,
      admin: false,
      staff: true,
      user: false,
      courses: assignedCourses,
      token: req.query.token ? req.query.token : "",
      level,
      userId
    });
  } catch (error: any) {
    res.render("auth/login", {
      path: "/",
      docTitle: "Login",
      errorMessage: error.message,
      error: false,
      isLoggedIn: false,
      admin: false,
      staff: false,
      user: false,
      token: "",
    });
  }
}

export async function getCourseMaterialsPage(req: Request, res: Response) {
  const { course, level, userId }: any = req.query;
  const materials = await materialServices.getMaterials("course", course);
  const _course = await courseService.getCourse("_id", course);
  res.render("staff/materials", {
    path: "staff",
    docTitle: "Materials",
    isLoggedIn: true,
    admin: false,
    staff: true,
    user: false,
    materials,
    course: _course,
    token: req.query.token ? req.query.token : "",
    level,
    userId
  });
}

export async function addCourseMaterial(req: Request, res: Response) {
  try {
    if (!req.file) throw new Error("No File uploaded");
    await materialServices.addMaterial({
      url: req.file.filename,
      course: req.body.course,
    });
    res.json({
      status: true,
      message: "Material Added!",
    });
  } catch (error: any) {
    res.json({
      status: false,
      message: error.message,
    });
  }
}
