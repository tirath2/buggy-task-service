export class AddTemplateDto {
  projectId: number;
  name: string;
  status: StatusSequenceDto[];
  id?: number;
}

class StatusSequenceDto {
  taskStatusId: number;
  taskStatusName: string;
  isEnd?: boolean;
  next: number[];
  roleThatCanOverRide: number[];
  sequence: number;
  id?: number;
}
