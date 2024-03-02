import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateStatus } from 'src/Entity/template-status';
import { Repository } from 'typeorm';
import { AddTemplateDto } from './dto/create-template.dto';
import { ERROR_MSG } from 'src/Utils/error-msg';

@Injectable()
export class TemplateStatusService {
  constructor(
    @InjectRepository(TemplateStatus)
    private readonly templateStatusRepo: Repository<TemplateStatus>,
  ) {}

  async add(addTemplateDto: AddTemplateDto, templateId: number) {
    try {
      const status = addTemplateDto?.status?.map((item) => {
        return this.templateStatusRepo.create({
          sequence: item.sequence,
          taskStatusName: item.taskStatusName,
          templateId,
          taskStatusId: item.taskStatusId,
          isEnd: Boolean(item.isEnd),
          next: item.next || [],
          roleThatCanOverRide: item.roleThatCanOverRide || [],
          id: item.id,
        });
      });
      return this.templateStatusRepo.save(status);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  get(id: number) {
    try {
      return this.templateStatusRepo.find({
        where: { templateId: id },
        order: { sequence: 'ASC' },
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }
}
