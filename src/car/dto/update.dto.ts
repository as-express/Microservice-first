import { IsNotEmpty } from 'class-validator';

export class updateDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  description: string;
}
