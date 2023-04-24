import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TypeUsersModule } from './typeusers/typeusers.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TypeOrmModule.forRoot({
              type: "mysql",
              host:  "localhost",
              port:  3306,
              username: "root",
              password: "",
              database: "service_api",
              entities: ["dist/**/**.entity{.ts,.js}"],
              synchronize: true
          }),
          ProductsModule,
          TypeUsersModule,
          UsersModule,
          AuthModule,
          CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
