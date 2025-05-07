import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceDto, UpdateDeviceDto } from './device.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly DeviceService: DeviceService) {}

  @Get()
  async findAll(@Query() filters: UpdateDeviceDto) {
    return this.DeviceService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.DeviceService.findOne(id);
  }

  @Post()
  async create(@Body() device: DeviceDto) {
    return this.DeviceService.create(device);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() device: UpdateDeviceDto,
  ) {
    return this.DeviceService.update(id, device);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.DeviceService.remove(id);
  }
}
