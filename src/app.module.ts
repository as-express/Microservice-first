import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car/entity/car.entity';
import { MarkModule } from './mark/mark.module';
import { Mark } from './mark/entity/mark.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CarModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Car, Mark],
      synchronize: true,
    }),
    MarkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
