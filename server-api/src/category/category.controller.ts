import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryEntity } from './category.entity/category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard('jwt-admin'))
  @Post()
  create(@Body() category: CategoryEntity) {
    return this.categoryService.create(category);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Get(':id/products')
  getProducts(@Param() params) {
    return this.categoryService.findProductsByCategory(params.id);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() category: CategoryEntity) {
    return this.categoryService.update(+id, category);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
