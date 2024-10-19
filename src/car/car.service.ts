import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entity/car.entity';
import { Repository } from 'typeorm';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';
import { MarkService } from 'src/mark/mark.service';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private car: Repository<Car>,
    private mark: MarkService,
  ) {}

  async create(dto: createDto) {
    const mark = await this.mark.getById(dto.mark);

    const car = this.car.create({
      title: dto.title,
      image: dto.image,
      description: dto.description,
      mark: mark,
    });

    await this.car.save(car);

    await this.mark.pushToCars(mark.id, car);
    return car;
  }

  async finAll(): Promise<Car[]> {
    return this.car.find();
  }

  async findById(id: number): Promise<Car> {
    return this.car.findOne({
      where: {
        id,
      },
    });
  }

  async like(id: number) {
    const car = await this.car.findOne({
      where: {
        id,
      },
    });

    if (!car) {
      throw new Error('Car not found');
    }

    car.likes += 1;
    await this.car.save(car);
  }

  async update(id: number, data: updateDto): Promise<any> {
    return this.car.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    const car = await this.findById(id);
    await this.mark.unPush(car.mark.id, car.id);

    await this.car.delete(id);
    return true;
  }

  async deleteAll() {
    await this.car.delete({});
    return true;
  }
}
