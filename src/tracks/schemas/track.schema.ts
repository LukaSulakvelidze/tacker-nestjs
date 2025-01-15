import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ _id: false })
class Coords {
  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  altitude: number;

  @Prop({ required: true })
  accuracy: number;

  @Prop({ required: true })
  heading: number;

  @Prop({ required: true })
  speed: number;
}

@Schema({ _id: false })
class Point {
  @Prop({ required: true })
  timestamp: number;

  @Prop({ required: true })
  coords: Coords;
}

@Schema()
export class Track {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.Array, required: true })
  locations: Point[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
