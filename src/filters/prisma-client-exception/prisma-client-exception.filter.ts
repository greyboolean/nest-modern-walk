import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma as MainPrisma } from '@prisma/main-client';
import { Prisma as TenantPrisma } from '@prisma/tenant-client';
import { Response } from 'express';

@Catch(
  MainPrisma.PrismaClientKnownRequestError,
  TenantPrisma.PrismaClientKnownRequestError,
)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception:
      | MainPrisma.PrismaClientKnownRequestError
      | TenantPrisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const message = 'Unique constraint failed on the database';
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Record not found';
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
