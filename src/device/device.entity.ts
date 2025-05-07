import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @Column({ type: 'enum', enum: ['available', 'in-use', 'inactive'] })
  state: 'available' | 'in-use' | 'inactive';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
