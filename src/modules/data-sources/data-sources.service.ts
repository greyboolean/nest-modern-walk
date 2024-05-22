import { Injectable } from '@nestjs/common';
import { CreateDataSourceDto } from './dto/create-data-source.dto';
import { UpdateDataSourceDto } from './dto/update-data-source.dto';
import { MainPrismaService } from '../prisma/main-prisma.service';

@Injectable()
export class DataSourcesService {
  constructor(private prisma: MainPrismaService) {}

  create(createDataSourceDto: CreateDataSourceDto) {
    return this.prisma.dataSource.create({
      data: createDataSourceDto,
    });
  }

  findAll() {
    return this.prisma.dataSource.findMany({
      include: {
        tenants: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.dataSource.findUnique({
      where: { id },
      include: {
        tenants: true,
      },
    });
  }

  update(id: number, updateDataSourceDto: UpdateDataSourceDto) {
    return this.prisma.dataSource.update({
      where: { id },
      data: updateDataSourceDto,
    });
  }

  remove(id: number) {
    return this.prisma.dataSource.delete({
      where: { id },
    });
  }
}
