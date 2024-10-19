import { IsNotEmpty } from 'class-validator';

export class createDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  mark: number;
}
