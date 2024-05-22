import { Test, TestingModule } from '@nestjs/testing';
import { DataSourcesController } from './data-sources.controller';
import { DataSourcesService } from './data-sources.service';

describe('DataSourcesController', () => {
  let controller: DataSourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSourcesController],
      providers: [DataSourcesService],
    }).compile();

    controller = module.get<DataSourcesController>(DataSourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
