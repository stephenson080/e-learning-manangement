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
        token: ''
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
        token: ''
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
        token: ''
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
        token: ''
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
      token: ''
    });
  }
}

export function isStaff(req: Request, res: Response, next: NextFunction) {
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
        token: ''
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
        token: ''
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
        token: ''
      });
    if (user.role !== Role.STAFF)
      return res.render("auth/login", {
        path: "/",
        docTitle: "Login",
        errorMessage: "Not Authorised",
        error: true,
        isLoggedIn: false,
        admin: false,
        staff: false,
        user: false,
        token: ''
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
      token: ''
    });
  }
}

export function isUser(req: Request, res: Response, next: NextFunction) {
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
        token: ''
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
        token: ''
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
        token: ''
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
      token: ''
    });
  }
}
