import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from 'src/Entity/template.entity';
import { TemplateStatus } from 'src/Entity/template-status';
import { TemplateStatusService } from './template-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Template, TemplateStatus])],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateStatusService],
})
export class TemplateModule {}
