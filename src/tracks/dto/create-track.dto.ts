import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class Coords {
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @IsNotEmpty()
  @IsNumber()
  alt: number;

  @IsNotEmpty()
  @IsNumber()
  accuracy: number;

  @IsNotEmpty()
  @IsNumber()
  heading: number;

  @IsNotEmpty()
  @IsNumber()
  speed: number;
}

class Point {
  @IsNotEmpty()
  @IsNumber()
  timeStamp: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Coords)
  coords: Coords;
}

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Point)
  locations: Point[];
}
