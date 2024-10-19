import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarService } from './car.service';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('car')
export class CarController {
  constructor(
    private readonly carService: CarService,
    @Inject('CAR_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('new')
  @UsePipes(new ValidationPipe())
  async new(@Body() dto: createDto) {
    const car = await this.carService.create(dto);

    this.client.emit('create_car', dto);
    return car;
  }

  @Get()
  async all() {
    return this.carService.finAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.carService.findById(id);
  }

  @Post(':id/like')
  async likeCar(@Param('id') id: number) {
    return this.carService.like(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: number, @Body() dto: updateDto) {
    await this.carService.update(id, dto);

    const car = await this.carService.findById(id);
    this.client.emit('update_car', car);

    return car;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.carService.delete(id);

    this.client.emit('delete_car', id);
    return true;
  }

  @Post('all')
  async deleteAll() {
    return this.carService.deleteAll();
  }
}
