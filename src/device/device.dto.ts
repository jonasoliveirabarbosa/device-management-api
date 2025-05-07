import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsString } from 'class-validator';

export class DeviceDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsIn(['available', 'in-use', 'inactive'])
  state: 'available' | 'in-use' | 'inactive';
}

export class UpdateDeviceDto extends PartialType(DeviceDto) {}
