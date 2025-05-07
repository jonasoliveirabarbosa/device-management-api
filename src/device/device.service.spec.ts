import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from './device.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('DeviceService', () => {
  let service: DeviceService;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockDevice = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Device 1',
    brand: 'Brand A',
    state: 'available',
  } as Device;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        {
          provide: getRepositoryToken(Device),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return a list of devices', async () => {
      mockRepository.find.mockResolvedValue([mockDevice]);
      const result = await service.findAll({
        name: '',
        brand: '',
        state: 'available',
      });
      expect(result).toEqual([mockDevice]);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: {
          state: 'available',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a device if it exists', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockDevice);
      const result = await service.findOne(mockDevice.id);
      expect(result).toEqual(mockDevice);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        id: mockDevice.id,
      });
    });

    it('should throw an exception if the device does not exist', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      await expect(service.findOne(mockDevice.id)).rejects.toThrow(
        new HttpException(
          `Device with id ${mockDevice.id} not found`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('create', () => {
    it('should create and return a new device', async () => {
      mockRepository.save.mockResolvedValue(mockDevice);
      const result = await service.create(mockDevice);
      expect(result).toEqual(mockDevice);
      expect(mockRepository.save).toHaveBeenCalledWith(mockDevice);
    });

    it('should throw an exception if payload is empty', async () => {
      await expect(service.create(null)).rejects.toThrow(
        new HttpException('Payload is required', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('update', () => {
    it('should throw an exception if payload is empty', async () => {
      await expect(service.update(mockDevice.id, null)).rejects.toThrow(
        new HttpException('Payload is required', HttpStatus.BAD_REQUEST),
      );
    });

    it('should update and return the updated device', async () => {
      const updatedDevice = { ...mockDevice, name: 'Updated Device' };
      mockRepository.findOneBy.mockResolvedValue(mockDevice);
      mockRepository.update.mockResolvedValue(undefined);
      mockRepository.findOneBy.mockResolvedValue(updatedDevice);

      const result = await service.update(mockDevice.id, updatedDevice);
      expect(result).toEqual(updatedDevice);
      expect(mockRepository.update).toHaveBeenCalledWith(
        mockDevice.id,
        updatedDevice,
      );
    });

    it('should throw an exception if the device does not exist', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      await expect(service.update(mockDevice.id, mockDevice)).rejects.toThrow(
        new HttpException(
          `Device with id ${mockDevice.id} not found`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('remove', () => {
    it('should remove the device', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockDevice);
      mockRepository.delete.mockResolvedValue(undefined);

      await service.remove(mockDevice.id);
      expect(mockRepository.delete).toHaveBeenCalledWith(mockDevice.id);
    });

    it('should throw an exception if the device does not exist', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      await expect(service.remove(mockDevice.id)).rejects.toThrow(
        new HttpException(
          `Device with id ${mockDevice.id} not found`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
