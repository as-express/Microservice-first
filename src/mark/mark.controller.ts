import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MarkService } from './mark.service';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('mark')
export class MarkController {
  constructor(
    private readonly markService: MarkService,
    @Inject('CAR_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Delete('all')
  async deleteAll() {
    return this.markService.deleteAll();
  }

  @Post('new')
  @UsePipes(new ValidationPipe())
  async newMark(@Body() dto: createDto) {
    const mark = await this.markService.newMark(dto);
    const data = { originId: mark.id, title: mark.title };
    this.client.emit('create_mark', data);
    return mark;
  }

  @Get()
  async getAll() {
    return this.markService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.markService.getById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('Id') id: number, @Body() dto: updateDto) {
    const mark = await this.markService.update(id, dto);

    this.client.emit('update_mark', mark);
    return mark;
  }

  @Delete(':id')
  async delete(@Param(':id') id: number) {
    this.client.emit('delete_mark', id);

    return this.markService.delete(id);
  }
}
