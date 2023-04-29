import { Request, Response } from "express";

import DepartmentService from "../services/departmentService";
import LevelService from "../services/levelService";
import SemesterService from "../services/semesterService";
import UserService from "../services/userServices";

import { CreateUserDto, LoginUserDto } from "../utils/dtos/userDtos";
import { decryptPassword, trimUser } from "../utils/helpers";
import { Role } from "../utils/types";

const semesterService = new SemesterService();
const departmentService = new DepartmentService();
const levelService = new LevelService();
const userService = new UserService();

export async function getIndexPage(req: Request, res: Response) {
  try {
    // const _query = req.query;
    const staffs = await userService.getAllUsers()
    const levels = await levelService.getAllLevels();
    const departments = await departmentService.getAllDepartment();
    res.render("admin/index", {
      path: "users",
      docTitle: "Admin",
      isLoggedIn: true,
      admin: true,
      staff: false,
      user: false,
      staffs: staffs.concat(staffs),
      students: staffs.concat(staffs),
      departments,
      levels
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
    });
  }
}
