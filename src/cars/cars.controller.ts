import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async getCars(): Promise<any> {
    return this.carsService.getCars();
  }
  @Get(':id')
  async getCarById(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    console.log({ id });
    // const newId = Number(id);
    // if (isNaN(newId)) {
    //   return 'ID Invalido';
    // }
    const car = this.carsService.getCarById(id);
    if (!car) {
      throw new NotFoundException(`Car with id '${id}' not found.`);
    }
    return { carro: car };
  }

  @Post()
  async createCar(@Body() createCarDto: CreateCarDTO): Promise<any> {
    const newCar = this.carsService.createCar(createCarDto);
    return newCar;
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDTO,
  ) {
    return this.carsService.updateCar(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.deleteCar(id);
  }
}
