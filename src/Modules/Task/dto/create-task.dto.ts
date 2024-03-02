import {
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsInt()
  @IsNotEmpty()
  projectId: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  parentId?: number;

  @IsString()
  type: string;

  @IsInt()
  @IsOptional()
  assignedTo?: number;

  @IsInt()
  statusId: number;

  @IsString()
  dueDate: Date;

  @IsString()
  priority: string;

  @IsArray()
  @Type(() => String)
  tags: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateApiLogDto)
  apiLogs?: CreateApiLogDto[];
}

class CreateApiLogDto {
  @IsString()
  @IsNotEmpty()
  curl: string;

  @IsString()
  @IsNotEmpty()
  response: string;

  @IsInt()
  @IsNotEmpty()
  statusCode: number;

  @IsInt()
  @IsNotEmpty()
  sequence: number;
}
