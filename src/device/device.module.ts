import { Module } from '@nestjs/common';
import { Device } from './device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [],
  controllers: [],
})
export class DeviceModule {}
