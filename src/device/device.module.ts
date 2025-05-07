import { Module } from '@nestjs/common';
import { Device } from './device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
