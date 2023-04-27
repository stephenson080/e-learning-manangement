import express, { Application } from "express";
import connectDatabase from "./database/index.db";

export default class App {
  PORT: any;
  app: Application;
  constructor(port: any) {
    this.PORT = process.env.PORT || port;
    this.app = express();
  }

  async start() {
    try {
      this.app.get("/", (_req, _res) => {
        _res.send("TypeScript With Express");
      });
      await connectDatabase()
      this.app.listen(this.PORT, () => {
        console.log(`App is Running on http://localhost:${this.PORT}`);
      });
    } catch (error: any) {
      console.log(error.message)
    }
  }
}
