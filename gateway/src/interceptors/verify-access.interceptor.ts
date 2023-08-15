import type { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import crypto from "crypto";
import { Observable } from "rxjs";

export class VerifyAccessInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest()

        const accessToken = request.headers["authorization"].replace('Bearer ', '')

        console.log(JSON.parse(JSON.stringify(Buffer.from(accessToken, 'base64').toString())))

        request.body.userId = 1

        return next.handle()
    }
}