import { Injectable } from '@nestjs/common';
import { Device } from './device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly storeRepository: Repository<Device>,
  ) {}

  async findAll(): Promise<Device[]> {
    return this.storeRepository.find();
  }

  async findOne(id: string): Promise<Device> {
    return this.storeRepository.findOneBy({ id });
  }

  async create(device: Device): Promise<Device> {
    return this.storeRepository.save(device);
  }

  async update(id: string, device: Device): Promise<Device> {
    await this.storeRepository.update(id, device);
    return this.storeRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.storeRepository.delete(id);
  }
}
