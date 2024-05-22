import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/main-client';
@Injectable()
export class MainPrismaService extends PrismaClient {}
