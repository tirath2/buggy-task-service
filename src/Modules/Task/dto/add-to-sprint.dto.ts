import { IsInt, IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AddToSprintDto {
  @IsInt()
  @IsNotEmpty()
  sprintId: number;

  @IsArray()
  @Type(() => Number)
  taskIds: number[];
}
