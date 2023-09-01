import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    { id: uuid(), name: 'Toyota', createdAt: new Date().getTime() },
  ];

  create(createBrandDto: CreateBrandDto) {
    const newBrand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((br: Brand) => br.id === id);
    if (!brand) {
      throw new NotFoundException();
    }
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let foundBrand = this.brands.find((br: Brand) => br.id === id);
    if (!foundBrand) {
      throw new NotFoundException(`Could not find brand with id: '${id}'.`);
    }
    this.brands = this.brands.map((br: Brand) => {
      if (br.id === foundBrand.id) {
        foundBrand = {
          ...foundBrand,
          ...updateBrandDto,
          updatedAt: new Date().getTime(),
          id,
        };
        return foundBrand;
      }
      return br;
    });
    return foundBrand;
  }

  remove(id: string) {
    const foundBrand = this.brands.find((br: Brand) => br.id === id);
    if (!foundBrand) {
      throw new NotFoundException(`Could not find brand with id: '${id}'.`);
    }
    this.brands = this.brands.filter((br: Brand) => br.id !== id);
    return foundBrand;
  }
}
