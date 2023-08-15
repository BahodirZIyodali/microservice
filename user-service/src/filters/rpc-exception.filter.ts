import type { ArgumentsHost } from '@nestjs/common'
import { Catch } from "@nestjs/common"
import { BaseRpcExceptionFilter, RpcException } from "@nestjs/microservices"
import { Observable, throwError } from 'rxjs';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<void> {
    return throwError(() => exception);
  }
}
