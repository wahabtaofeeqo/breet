
import cors from "cors";
import express, {Application } from "express";
import apiRoute from "./routes";

class App {

  public express: Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.get("/", (req, res) => {
      res.json({
        status: true,
        message: "The API is up, let's consume!"
      })
    });

    this.express.use("/api/v1", apiRoute);
    
    this.express.use((req, res, next) => {
      const error = new Error();
      error.message = 'Route Not Found';
      // @ts-ignore
      error.status = 404;
      next(error);
    });

    this.express.use((error, req, res, next) => {
      return res.status(error.status ?? 500).json({
        status: false,
        message: error.message ?? 'Something went wrong!'
      });
    });
  }
}

export default new App().express;