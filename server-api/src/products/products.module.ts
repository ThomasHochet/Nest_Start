import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService]
})

export class ProductsModule {}
