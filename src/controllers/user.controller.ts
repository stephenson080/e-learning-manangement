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

export async function getUserIndexPage(req: Request, res: Response) {
  const { level }: any = req.query;
  console.log(level)
  const courses = await courseService.getCourses("level", level);
  res.render("user/index", {
    path: "user",
    docTitle: "Student",
    isLoggedIn: true,
    admin: false,
    staff: false,
    user: true,
    courses,
    token: req.query.token ? req.query.token : "",
    level
  });
}

export async function getCourseMaterialsPage(req: Request, res: Response) {
  const { course, level }: any = req.query;
  const materials = await materialServices.getMaterials('course', course)
  const _course = await courseService.getCourse('_id', course)
  res.render("user/materials", {
    path: "user",
    docTitle: "Materials",
    isLoggedIn: true,
    admin: false,
    staff: false,
    user: true,
    materials,
    course: _course,
    token: req.query.token ? req.query.token : "",
    level
  });
}
