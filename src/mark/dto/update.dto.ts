import { IsNotEmpty } from 'class-validator';

export class updateDto {
  @IsNotEmpty()
  title: string;
}
