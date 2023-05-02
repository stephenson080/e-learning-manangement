import express, { Application, Request } from "express";
import {join} from 'path'
import {urlencoded, json} from 'body-parser'
import multer from 'multer'

import authRouter from "./routes/auth.route";
import adminRouter from "./routes/admin.route";
import userRouter from "./routes/user.route";
import staffRouter from "./routes/staff.route";

// import { get404Page, get500Page } from "./controllers/error.controller";
// import { getLoginPage } from "./controllers/auth.controller";

import connectDatabase from "./database/index.db";





// import { seedRecords } from "./database/seedRecords";

export default class App {
  PORT: any;
  app: Application;
  constructor(port: any) {
    this.PORT = process.env.PORT || port;
    this.app = express();
    this.setup()
  }

  private setup(){
    this.app.set('views', join(__dirname, '..', 'views'));
    this.app.set('view engine', 'ejs');

    this.app.use(urlencoded({extended: false}))
    this.app.use(json())

    const fileStorage = multer.diskStorage({
      destination: (req,file,cb)=>{
          cb(null, join(__dirname, '..', 'uploads'))
      },
      filename: (req,file,cb)=>{
          cb(null, Date.now().toString() + "_" + file.originalname)
      },
    })

    this.app.use(multer({storage: fileStorage, limits: {fileSize: 500000}, }).single("file"))
  
    this.app.use('/css', express.static(join(__dirname, '..', 'public', 'css')))
    this.app.use('/js', express.static(join(__dirname, '..', 'public', 'js')))
    this.app.use('/img', express.static(join(__dirname, '..', 'public', 'img')))
    // this.app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

    this.app.use('/auth', authRouter)
    this.app.use('/admin', adminRouter)
    this.app.use('/user', userRouter)
    this.app.use('/staff', staffRouter)
    // this.app.use('/500', get500Page)
    // this.app.use(get404Page)
    // this.app.use((err: any, req : any, res : any, next :any) => {
    //   get500Page(req, res, next)
    // })

  }

  async start() {
    try {
      this.app.get("/", (_req, _res) => {
        _res.redirect('/auth/login')
      });
      await connectDatabase()
      // await seedRecords()
      this.app.listen(this.PORT, () => {
        console.log(`App is Running on http://localhost:${this.PORT}`);
      });
    } catch (error: any) {
      console.log(error.message)
    }
  }
}
