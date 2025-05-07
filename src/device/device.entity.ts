import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @Column({ type: 'enum', enum: ['available', 'in-use', 'inactive'] })
  state: 'available' | 'in-use' | 'inactive';

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  createdAt: Date;
}
