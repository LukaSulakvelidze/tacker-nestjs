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
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  altitude: number;

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
  timestamp: number;

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
