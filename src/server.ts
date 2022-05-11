import express, { Express, NextFunction, Request, Response } from 'express';
import Router from 'express-promise-router';
import compress from 'compression';

import { Server as HttpServer } from 'http';
import { json, urlencoded } from 'body-parser';
import errorHandler from 'errorhandler';
import httpStatus from 'http-status';
import { registerRoutes } from './infrastructure/core/routes';
import helmet from 'helmet';

class Server {
  private app: Express;
  private port: string;
  private httpServer?: HttpServer;

  constructor(port: string) {
    this.port = port;
    this.app = express();
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(express.static(__dirname + '/../output'));
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: 'deny' }));
    this.app.use(compress());

    const router = Router();
    router.use(errorHandler());
    this.app.use(router);

    registerRoutes(router);

    router.use(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
      }
    );
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.app.listen(this.port, () => {
        console.log(
          ` 🚀 Image Resizer App is running at http://localhost:${
            this.port
          } in ${this.app.get('env')} mode`
        );
        console.log('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}

export default Server;
