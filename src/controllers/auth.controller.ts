import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import DepartmentService from "../services/departmentService";
import LevelService from "../services/levelService";
import SemesterService from "../services/semesterService";
import UserService from "../services/userServices";

import { CreateUserDto, LoginUserDto } from "../utils/dtos/userDtos";
import { decryptPassword, trimUser } from "../utils/helpers";

const semesterService = new SemesterService();
const departmentService = new DepartmentService();
const levelService = new LevelService();
const userService = new UserService();

export function getLoginPage(req: Request, res: Response) {
  res.render("auth/login", {
    path: "/",
    docTitle: "Login",
    errorMessage: "",
    error: false,
    isLoggedIn: false,
    admin: false,
    staff: false,
    user: false,
    token: ''
  });
}

export async function loginUser(req: Request, res: Response) {
  try {
    const body: LoginUserDto = req.body;
    const existUser = await userService.getUser("regNo", body.regNo);
    if (!existUser) throw new Error("Invalid Details");
    const isMatched = await decryptPassword(body.password, existUser.password);
    if (!isMatched) throw new Error("Invalid Details");
    const token = sign(
      { userId: existUser._id, role: existUser.role },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
    res.json({
      token,
      user: existUser,
    });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
}

export async function getSignUpPage(req: Request, res: Response) {
  const levels = await levelService.getAllLevels();
  const departments = await departmentService.getAllDepartment();
  res.render("auth/signup", {
    path: "/signup",
    docTitle: "Sign up",
    errorMessage: "",
    error: false,
    isLoggedIn: false,
    departments,
    levels,
    admin: false,
    staff: false,
    user: false,
    token: ''
  });
}

export async function signUpUser(req: Request, res: Response) {
  const levels = await levelService.getAllLevels();
  const departments = await departmentService.getAllDepartment();
  try {
    const body: CreateUserDto = req.body;
    await userService.createUser(body);

    res.render("auth/signup", {
      path: "/signup",
      docTitle: "Sign up",
      errorMessage: "Registeration Sucessful",
      error: false,
      isLoggedIn: false,
      departments,
      levels,
      admin: false,
      staff: false,
      user: false,
      token: ''
    });
    // res.json({
    //     message: "Registration Successful!"
    // })
  } catch (error: any) {
    console.log(error);
    res.render("auth/signup", {
      path: "/signup",
      docTitle: "Sign up",
      errorMessage: error.message,
      error: true,
      isLoggedIn: false,
      departments,
      levels,
      admin: false,
      staff: false,
      user: false,
      token: ''
    });
  }
}
