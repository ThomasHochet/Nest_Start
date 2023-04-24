import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity/product.entity';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(ProductEntity) private productsRepository: Repository<ProductEntity>) { }

    async getProducts(): Promise<ProductEntity[]> {
        return await this.productsRepository.find();
    }

    async findProduct(_id: number): Promise<ProductEntity | undefined> {
        const category = await this.productsRepository.find({
            relations: { category: true },
            where: [{ id: _id }]
        });
        if (category.length === 1)
            return category[0];
        else 
            return undefined;
    }

    async getProductbyCategory(_id: number): Promise<ProductEntity[]> {
        return await this.productsRepository.createQueryBuilder('product')
                                            .leftJoinAndSelect('product.category', 'category')
                                            .where('category.id = :categoryId', { categoryId: _id })
                                            .getMany();
    }

    async createProduct(product: ProductEntity){
        return await this.productsRepository.save(product);
    }

    async updateProduct(product: ProductEntity) {
        this.productsRepository.save(product)
    }

    async deleteProduct(product: ProductEntity) {
        this.productsRepository.delete(product);
    }

}
