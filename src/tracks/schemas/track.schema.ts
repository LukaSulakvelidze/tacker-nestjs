import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ _id: false })
class Coords {
  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;

  @Prop({ required: true })
  alt: number;

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
  timeStamp: number;

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
