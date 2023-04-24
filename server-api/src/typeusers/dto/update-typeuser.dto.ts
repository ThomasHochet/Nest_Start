import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeuserDto } from './create-typeuser.dto';

export class UpdateTypeuserDto extends PartialType(CreateTypeuserDto) {}
