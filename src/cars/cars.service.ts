import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    { id: uuid(), brand: 'Mazda', model: '3' },
    { id: uuid(), brand: 'Honda', model: 'Civic' },
  ];

  getCars(): any[] {
    return this.cars;
  }

  getCarById(id: string): any {
    return this.cars.find((car: Car) => car.id === id);
  }

  createCar(car: CreateCarDTO): Car {
    const newCar: Car = {
      id: uuid(),
      ...car,
    };
    this.cars.push(newCar);
    return newCar;
  }

  updateCar(id: string, updateCarDto: UpdateCarDTO): Car {
    let foundCar = this.getCarById(id);
    if (!foundCar) {
      throw new NotFoundException('Could not find car with that id.');
    }
    if (foundCar.id !== updateCarDto.id) {
      throw new BadRequestException('Car id not valid inside body.');
    }
    this.cars = this.cars.map((car: Car) => {
      if (car.id === id) {
        foundCar = {
          ...foundCar,
          ...updateCarDto,
          id,
        };
        return foundCar;
      }
      return car;
    });
    return this.getCarById(id);
  }

  deleteCar(id: string): Car {
    const car = this.getCarById(id);
    if (!car) {
      throw new NotFoundException('Could not find car with that id.');
    }
    this.cars.splice(
      this.cars.findIndex((car) => car.id === id),
      1,
    );
    return car;
  }
}
