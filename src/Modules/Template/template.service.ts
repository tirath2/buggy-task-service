import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from 'src/Entity/template.entity';
import { Repository } from 'typeorm';
import { AddTemplateDto } from './dto/create-template.dto';
import { TemplateStatusService } from './template-status.service';
import { ERROR_MSG } from 'src/Utils/error-msg';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepo: Repository<Template>,
    private readonly templateStatusService: TemplateStatusService,
  ) {}

  async add(addTemplateDto: AddTemplateDto) {
    try {
      const template = await this.templateRepo.save({
        name: addTemplateDto.name,
        projectId: addTemplateDto.projectId,
        id: addTemplateDto.id,
      });
      const status = await this.templateStatusService.add(
        addTemplateDto,
        template.id,
      );
      return {
        ...template,
        status,
      };
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async get(id: number) {
    try {
      const template = await this.templateRepo.findOne({
        where: { projectId: id },
      });
      if (!template) {
        return null;
      }
      const status = await this.templateStatusService.get(template.id);
      return {
        ...template,
        status,
      };
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }
}
