import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class BusinessErrorFilter<Error> implements ExceptionFilter {
  private readonly logger=new Logger("BussinessErrorFilter");

  public catch(exception:Error, host: ArgumentsHost) {
    // !http specific
    const httpContext = host.switchToHttp();
    const response = httpContext.getResponse<Response>();
    const errorMessage = '👮‍♂️' + (exception as any).message;
    this.logger.error(errorMessage);
    // !express especific
    response.status(HttpStatus.BAD_REQUEST).json(
      {
        statusCode : HttpStatus.BAD_REQUEST,
        message: errorMessage,
      }
    );
  }
}
