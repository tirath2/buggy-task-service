import { IsString, IsOptional, IsInt, IsNumber } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  parentId?: number;

  @IsOptional()
  type?: string;

  @IsInt()
  @IsOptional()
  assignedTo?: number;

  @IsInt()
  @IsOptional()
  statusId?: number;
}
