import { NextFunction, Request, Response } from "express";



export async function get404Page(req: Request, res: Response) {
  
  res.render("error/404", {
    path: "user",
    docTitle: "Page not Found",
  });
}

export async function get500Page(req: Request, res: Response, next: NextFunction) {
    console.log('jdsjkdj')
    res.render("error/500", {
      path: "Error",
      docTitle: "Error",
    });
}