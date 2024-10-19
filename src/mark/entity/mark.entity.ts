import { Car } from 'src/car/entity/car.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 0 })
  markRating: number;

  @Column({ type: 'json', nullable: true })
  usersRating: number[];

  @Column({ default: 0 })
  carsCount: number;

  @OneToMany(() => Car, (car) => car.mark, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  cars: Car[];
}
