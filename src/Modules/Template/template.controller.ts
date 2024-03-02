/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AddTemplateDto } from './dto/create-template.dto';
import { TemplateService } from './template.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('template')
@ApiTags('template')
@UseGuards(AuthGuard('jwt'))
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post('add')
  @ApiBody({ type: AddTemplateDto })
  async addStatus(@Body() addTemplateDto: AddTemplateDto) {
    console.log('hey');
    return this.templateService.add(addTemplateDto);
  }

  @Get('fetch/:id')
  async fetchStatuses(@Param('id', ParseIntPipe) id: number) {
    return this.templateService.get(id);
  }
}
