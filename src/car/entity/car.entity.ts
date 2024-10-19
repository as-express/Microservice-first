import { Mark } from 'src/mark/entity/mark.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => Mark, (mark) => mark.cars)
  mark: Mark;
}
