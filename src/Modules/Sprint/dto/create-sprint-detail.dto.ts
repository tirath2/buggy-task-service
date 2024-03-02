import {
  IsString,
  IsOptional,
  IsInt,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { SPRINT_DURATION_UNIT } from 'src/enums/sprint-duration-unit.enum';

export class CreateSprintDetailsDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsInt()
  duration: number;

  @IsString()
  durationUnit: SPRINT_DURATION_UNIT;

  @IsInt()
  @IsNotEmpty()
  projectId: number;

  @IsBoolean()
  @IsOptional()
  autoCreateSprint: boolean;

  @IsString()
  @IsOptional()
  startTime: string;
}
