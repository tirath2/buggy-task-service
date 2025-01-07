import { IsOptional } from 'class-validator';

// status.dto.ts
export class AddStatusDto {
  projectId: number;
  name: string;
  @IsOptional()
  colorCode: string;
}
