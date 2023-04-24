import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { CategoryController } from './category.controller';
import { CategoryEntity } from './category.entity/category.entity';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), ProductsModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
