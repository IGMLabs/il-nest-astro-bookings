import { Injectable, Logger, NestMiddleware, HttpStatus } from '@nestjs/common';
import { rmSync } from 'fs';

@Injectable()
export class MonitorMiddleware implements NestMiddleware {
  private readonly logger=new Logger("BussinessErrorFilter");
  // ! express specific
  public use(req: any, res: any, next: () => void) {
    const requestInfo = this.getRequestInfo(req);
    this.logger.debug(requestInfo);
    const logEntry = `${requestInfo}`;
    this.logger.debug(logEntry);
    const start = Date.now();
    const errorCode = 400;
    res.on('finish', ()=>{
      const responseInfo = this.getResponseInfo(res, start);
      this.logger.debug(responseInfo);
      if (res.statusCode > errorCode){
        this.logError(res); 
      }
    })
    next();
  }

  private logError(res: any) {
    const error = res.statusMessage;
    const errorInfo = `${res.statusCode} - ${error}`;
    this.logger.warn(errorInfo);
  }

  private getResponseInfo(res: any, start: number) {
    const contentLength = res.get('content-lenght') || 0;
    const end = Date.now();
    const elapsed = end - start;
    const responseInfo = `${elapsed} ms ${contentLength} bs`;
    return responseInfo;
  }

  private getRequestInfo(req: any) {
    const { ip, originalUrl, method } = req;
    const userAgent = req.headers["user-agent"] || "unknow";
    const requestInfo = `${ip} ${userAgent} [${method}] : ${originalUrl}`;
    return requestInfo;
  }
}
