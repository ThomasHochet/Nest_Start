import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/product.entity/product.entity';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
      @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
      @Inject(ProductsService) private productServices: ProductsService    
    ) {}

  async create(category: CategoryEntity) {
    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findOne(_id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOneBy({ 'id': _id });
  }

  async findProductsByCategory(_id: number): Promise<ProductEntity[]> {
    return await this.productServices.getProductbyCategory(_id);
  }

  async update(id: number, category: CategoryEntity) {
    return await this.categoryRepository.update(id, category);
  }

  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }
}
