import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column('longtext')
  description: string;
}