import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DataSourcesService } from './data-sources.service';
import { CreateDataSourceDto } from './dto/create-data-source.dto';
import { UpdateDataSourceDto } from './dto/update-data-source.dto';
import { DataSource } from './entities/data-source.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('data-sources')
@Roles(Role.Admin)
@ApiTags('data-sources')
@ApiBearerAuth()
export class DataSourcesController {
  constructor(private readonly dataSourcesService: DataSourcesService) {}

  @Post()
  @ApiCreatedResponse({ type: DataSource })
  create(@Body() createDataSourceDto: CreateDataSourceDto) {
    return this.dataSourcesService.create(createDataSourceDto);
  }

  @Get()
  @ApiOkResponse({ type: DataSource, isArray: true })
  findAll() {
    return this.dataSourcesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: DataSource })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dataSourcesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: DataSource })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDataSourceDto: UpdateDataSourceDto,
  ) {
    return this.dataSourcesService.update(id, updateDataSourceDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DataSource })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dataSourcesService.remove(id);
  }
}
