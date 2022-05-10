import Server from './server';

class ImageResizerApp {
  server?: Server;

  async start() {
    const port = process.env.PORT ?? '3000';
    this.server = new Server(port);
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    return this.server?.stop();
  }
}

export default ImageResizerApp;
