import {
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Device } from './device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceDto, UpdateDeviceDto } from './device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly storeRepository: Repository<Device>,
  ) {}

  async findAll(filters: UpdateDeviceDto): Promise<Device[]> {
    return this.storeRepository.find(
      filters
        ? {
            where: {
              ...(filters.name && { name: filters.name }),
              ...(filters.brand && { brand: filters.brand }),
              ...(filters.state && { state: filters.state }),
            },
          }
        : {},
    );
  }

  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Device> {
    return await this.ensureDeviceExists(id);
  }

  async create(device: DeviceDto): Promise<Device> {
    this.ensurePayloadExists(device);
    return this.storeRepository.save(device);
  }

  async update(id: string, device: UpdateDeviceDto): Promise<Device> {
    this.ensurePayloadExists(device);
    const existingDevice = await this.ensureDeviceExists(id);

    this.ensureDeviceNotInUse(existingDevice, device);

    await this.storeRepository.update(id, device);
    return this.storeRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const existingDevice = await this.ensureDeviceExists(id);
    this.ensureDeviceNotInUseDelete(existingDevice);

    await this.storeRepository.delete(id);
  }

  private ensurePayloadExists(payload: DeviceDto | UpdateDeviceDto): void {
    if (!payload || Object.keys(payload).length === 0) {
      throw new HttpException('Payload is required', HttpStatus.BAD_REQUEST);
    }
  }

  private async ensureDeviceExists(id: string): Promise<Device> {
    const device = await this.storeRepository.findOneBy({ id });
    if (!device) {
      throw new HttpException(
        `Device with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return device;
  }

  private ensureDeviceNotInUse(
    device: Device,
    updateData: UpdateDeviceDto,
  ): void {
    if (device.state === 'in-use') {
      if (
        updateData &&
        ((updateData.brand && updateData.brand !== device.brand) ||
          (updateData.name && updateData.name !== device.name))
      ) {
        throw new HttpException(
          `Device with id ${device.id} cannot have the brand or name updated while in use`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  private ensureDeviceNotInUseDelete(device: Device): void {
    if (device.state === 'in-use') {
      throw new HttpException(
        `Device with id ${device.id} cannot be deleted while in use`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
