import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DataSourcesService } from './data-sources.service';
import { CreateDataSourceDto } from './dto/create-data-source.dto';
import { UpdateDataSourceDto } from './dto/update-data-source.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DataSource } from './entities/data-source.entity';

@Controller('data-sources')
@ApiTags('data-sources')
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
  findOne(@Param('id') id: string) {
    return this.dataSourcesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: DataSource })
  update(
    @Param('id') id: string,
    @Body() updateDataSourceDto: UpdateDataSourceDto,
  ) {
    return this.dataSourcesService.update(+id, updateDataSourceDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DataSource })
  remove(@Param('id') id: string) {
    return this.dataSourcesService.remove(+id);
  }
}
