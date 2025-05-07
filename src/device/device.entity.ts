import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Device {
  @ApiProperty({
    description: 'The unique identifier of the device',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the device',
    example: 'iPhone 13',
  })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    description: 'The brand of the device',
    example: 'Apple',
  })
  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @ApiProperty({
    description: 'The state of the device',
    example: 'available',
    enum: ['available', 'in-use', 'inactive'],
  })
  @Column({ type: 'enum', enum: ['available', 'in-use', 'inactive'] })
  state: 'available' | 'in-use' | 'inactive';

  @ApiProperty({
    description: 'The date and time when the device was created',
    example: '2023-10-01T12:00:00Z',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  createdAt: Date;
}
