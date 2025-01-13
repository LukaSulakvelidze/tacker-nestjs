import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { Model } from 'mongoose';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track.name)
    private readonly trackModel: Model<Track>,
  ) {}
  create(createTrackDto: CreateTrackDto, userId: string) {
    return this.trackModel.create({ ...createTrackDto, userId });
  }

  findAll(req) {
    return this.trackModel.find({ userId: req.userId });
  }

  findOne(id: string) {
    return this.trackModel.findById(id).select('-userId');
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
