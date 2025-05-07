import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from './device.entity';

@Controller('device')
export class DeviceController {
  constructor(private readonly DeviceService: DeviceService) {}

  @Get()
  async findAll() {
    return this.DeviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.DeviceService.findOne(id);
  }

  @Post()
  async create(@Body() device: Device) {
    return this.DeviceService.create(device);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() device: Device) {
    return this.DeviceService.update(id, device);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.DeviceService.remove(id);
  }
}
