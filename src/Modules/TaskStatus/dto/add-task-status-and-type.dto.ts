// status.dto.ts
export class AddStatusAndTypeDto {
  projectId: number;
  status: { name: string }[];
  type: { name: string }[];
}
