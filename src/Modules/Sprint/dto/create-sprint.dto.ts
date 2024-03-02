import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreateSprintDto {
  @IsInt()
  @IsNotEmpty()
  projectId: number;

  @IsString()
  @IsOptional()
  startDate: Date;

  @IsString()
  @IsOptional()
  endDate: string;
}
