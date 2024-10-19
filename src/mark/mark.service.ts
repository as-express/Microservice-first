import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from './entity/mark.entity';
import { Repository } from 'typeorm';
import { Car } from 'src/car/entity/car.entity';
import { updateDto } from './dto/update.dto';
import { createDto } from './dto/create.dto';

@Injectable()
export class MarkService {
  constructor(@InjectRepository(Mark) private mark: Repository<Mark>) {}

  async newMark(dto: createDto) {
    const mark = this.mark.create({
      title: dto.title,
    });

    return this.mark.save(mark);
  }

  async getAll() {
    return this.mark.find();
  }

  async delete(id: number) {
    await this.mark.delete(id);
    return true;
  }

  async update(id, dto: updateDto) {
    await this.mark.update(id, dto);
    return this.getById(id);
  }

  async getById(id: number) {
    const mark = await this.mark.findOne({
      where: { id },
      relations: ['cars'],
    });

    if (!mark) throw new NotFoundException('Mark is not defined');
    return mark;
  }

  async pushToCars(id: number, car: Car) {
    const mark = await this.getById(id);

    mark.cars.push(car);
    await this.mark.save(mark);
  }

  async unPush(id: number, carId: number) {
    const mark = await this.getById(id);

    const carIndex = mark.cars.findIndex((car) => car.id === carId);
    if (carIndex === -1) {
      throw new NotFoundException('Car not associated with this mark');
    }

    mark.cars.splice(carIndex, 1);
    await this.mark.save(mark);
  }

  async deleteAll() {
    await this.mark.delete({});
    return true;
  }
}
