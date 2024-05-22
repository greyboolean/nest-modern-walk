import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../../prisma/generated/main-client';

@Injectable()
export class MainPrismaService extends PrismaClient {}
