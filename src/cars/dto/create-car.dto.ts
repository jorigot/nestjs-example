import { IsString } from 'class-validator';

export class CreateCarDTO {
  @IsString({ message: 'Brand must be a valid brand please.' })
  readonly brand: string;
  @IsString()
  readonly model: string;
}
