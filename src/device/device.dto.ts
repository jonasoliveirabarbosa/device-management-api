import { ApiProperty, ApiSchema, PartialType } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

@ApiSchema({ description: 'Device DTO Schema' })
export class DeviceDto {
  @ApiProperty({
    description: 'The name of the device',
    example: 'iPhone 13',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The brand of the device',
    example: 'Apple',
  })
  @IsString()
  brand: string;

  @ApiProperty({
    description: 'The state of the device',
    example: 'available',
    enum: ['available', 'in-use', 'inactive'],
  })
  @IsIn(['available', 'in-use', 'inactive'])
  state: 'available' | 'in-use' | 'inactive';
}

export class UpdateDeviceDto extends PartialType(DeviceDto) {}
