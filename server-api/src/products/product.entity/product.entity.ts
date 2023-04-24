import { CategoryEntity } from 'src/category/category.entity/category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 250 })
    name:string;

    @Column('longtext')
    description:string;

    @Column('longtext')
    image: string;

    @Column('decimal', { precision: 6, scale: 2 })
    price: number;

    @Column()
    isactive: boolean;

    @ManyToOne(category => CategoryEntity, category => category.id)
    @JoinColumn({ name: 'category' })
    @Column({ nullable: true })
    category: CategoryEntity;
}
