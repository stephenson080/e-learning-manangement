import express, { Application } from "express";
import {join} from 'path'
import {urlencoded, json} from 'body-parser'

import authRouter from "./routes/auth.route";
import adminRouter from "./routes/admin.route";

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
  
    this.app.use('/css', express.static(join(__dirname, '..', 'public', 'css')))
    this.app.use('/js', express.static(join(__dirname, '..', 'public', 'js')))
    this.app.use('/img', express.static(join(__dirname, '..', 'public', 'img')))

    this.app.use('/auth', authRouter)
    this.app.use('/admin', adminRouter)

  }

  async start() {
    try {
      // this.app.get("/", (_req, _res) => {
      //   _res.send("TypeScript With Express");
      // });
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
