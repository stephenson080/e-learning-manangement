import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Role } from "../utils/types";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const _query = req.query;
    if (!_query) {
      res.render("auth/login", {
        path: "/",
        docTitle: "Login",
        errorMessage: "Not Authorised",
        error: true,
        isLoggedIn: false,
        admin: false,
        staff: false,
        user: false,
      });
      return;
    }

    if (!_query.token) {
      res.render("auth/login", {
        path: "/",
        docTitle: "Login",
        errorMessage: "Not Authorised",
        error: true,
        isLoggedIn: false,
        admin: false,
        staff: false,
        user: false,
      });
      return;
    }
    const user: any = verify(_query.token as string, "secretkeyappearshere");
    if (!user)
      return res.render("auth/login", {
        path: "/",
        docTitle: "Login",
        errorMessage: "Not Authorised",
        error: true,
        isLoggedIn: false,
        admin: false,
        staff: false,
        user: false,
      });
    if (user.role !== Role.ADMIN)
      return res.render("auth/login", {
        path: "/",
        docTitle: "Login",
        errorMessage: "Not Authorised",
        error: true,
        isLoggedIn: false,
        admin: false,
        staff: false,
        user: false,
      });
    next();
  } catch (error) {
    res.render("auth/login", {
      path: "/",
      docTitle: "Login",
      errorMessage: "Not Authorised",
      error: true,
      isLoggedIn: false,
      admin: false,
      staff: false,
      user: false,
    });
  }
}
