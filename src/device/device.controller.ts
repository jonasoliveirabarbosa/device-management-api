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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { Device } from './device.entity';

@Controller('device')
export class DeviceController {
  constructor(private readonly DeviceService: DeviceService) {}

  @ApiQuery({ name: 'filters', required: false, type: UpdateDeviceDto })
  @ApiOkResponse({
    description: 'The devices have been successfully found.',
    type: Device,
    isArray: true,
  })
  @Get()
  async findAll(@Query() filters: UpdateDeviceDto) {
    return this.DeviceService.findAll(filters);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The device has been successfully found.',
    type: Device,
  })
  @ApiNotFoundResponse({
    description: 'The device with the given ID was not found.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.DeviceService.findOne(id);
  }

  @Post()
  @ApiBadRequestResponse({
    description: 'The device payload is invalid.',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Device,
  })
  async create(@Body() device: DeviceDto) {
    return this.DeviceService.create(device);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'The device has been successfully updated.',
    type: Device,
  })
  @ApiBadRequestResponse({
    description: 'The device is in use and cannot be updated.',
  })
  @ApiNotFoundResponse({
    description: 'The device with the given ID was not found.',
  })
  @ApiQuery({ name: 'id', required: true, type: String })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() device: UpdateDeviceDto,
  ) {
    return this.DeviceService.update(id, device);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The device has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    description: 'The device is in use and cannot be deleted.',
  })
  @ApiNotFoundResponse({
    description: 'The device with the given ID was not found.',
  })
  @ApiQuery({ name: 'id', required: true, type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.DeviceService.remove(id);
  }
}
