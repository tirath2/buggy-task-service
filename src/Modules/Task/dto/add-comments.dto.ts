import {
  IsInt,
  IsArray,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddCommentsDto {
  @IsInt()
  @IsNotEmpty()
  taskId: number;

  @IsArray()
  @Type(() => Number)
  @IsOptional()
  mentioned: number[];

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsInt()
  @IsOptional()
  repliedTo: number;
}
