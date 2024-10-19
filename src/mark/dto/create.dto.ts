import { IsNotEmpty } from 'class-validator';

export class createDto {
  @IsNotEmpty()
  title: string;
}
