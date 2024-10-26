import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Catch()
export class AllExceptionFilters implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toString(),
      path: request.url,
      method: request.method,
      message:
        exception instanceof HttpException
          ? exception.message
          : 'Internal server error',
      stack: exception instanceof Error ? exception.stack : '',
    };

    const logFilePath = path.join(__dirname, '../../../logs/error.log');
    const logMessage = `${errorResponse.timestamp} - ${errorResponse.method} ${errorResponse.path} - ${errorResponse.message}\nStack: ${errorResponse.stack}\n\n`;
    fs.appendFileSync(logFilePath, logMessage);

    response.status(status).json({
      ...errorResponse,
    });
  }
}
