import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entity/car.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MarkModule } from 'src/mark/mark.module';

@Module({
  imports: [
    MarkModule,
    TypeOrmModule.forFeature([Car]),
    ClientsModule.register([
      {
        name: 'CAR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
