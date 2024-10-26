import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((res: unknown) => this.responseHandler(res)));
  }

  responseHandler(res: any) {
    return {
      success: true,
      message: res?.message ?? 'Request Fulfilled',
      data: res,
      meta: res?.meta, // Pagination Data should be sent in this
    };
  }
}
