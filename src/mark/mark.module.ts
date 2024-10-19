import { Module } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './entity/mark.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mark]),
    ClientsModule.register([
      {
        name: 'CAR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://epvsgzdz:4TyK1OUcgwa_PvR06dqJdvIroiLcPQ48@moose.rmq.cloudamqp.com/epvsgzdz',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [MarkController],
  providers: [MarkService],
  exports: [MarkService, TypeOrmModule],
})
export class MarkModule {}
