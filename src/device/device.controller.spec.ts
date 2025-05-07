import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { DeviceDto, UpdateDeviceDto } from './device.dto';

describe('DeviceController', () => {
  let controller: DeviceController;
  let service: DeviceService;

  const mockDeviceService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockDeviceId = '123e4567-e89b-12d3-a456-426614174000';

  const mockDevice = {
    name: 'Device 1',
    brand: 'Brand A',
    state: 'available',
  } as DeviceDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [
        {
          provide: DeviceService,
          useValue: mockDeviceService,
        },
      ],
    }).compile();

    controller = module.get<DeviceController>(DeviceController);
    service = module.get<DeviceService>(DeviceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call DeviceService.findAll with filters and return the result', async () => {
      const filters: UpdateDeviceDto = { name: 'Device 1' };
      mockDeviceService.findAll.mockResolvedValue([mockDevice]);

      const result = await controller.findAll(filters);
      expect(result).toEqual([mockDevice]);
      expect(service.findAll).toHaveBeenCalledWith(filters);
    });
  });

  describe('findOne', () => {
    it('should call DeviceService.findOne with the correct id and return the result', async () => {
      mockDeviceService.findOne.mockResolvedValue(mockDevice);

      const result = await controller.findOne(mockDeviceId);
      expect(result).toEqual(mockDevice);
      expect(service.findOne).toHaveBeenCalledWith(mockDeviceId);
    });
  });

  describe('create', () => {
    it('should call DeviceService.create with the correct payload and return the result', async () => {
      const deviceDto: DeviceDto = {
        name: 'Device 1',
        brand: 'Brand A',
        state: 'available',
      };
      mockDeviceService.create.mockResolvedValue(mockDevice);

      const result = await controller.create(deviceDto);
      expect(result).toEqual(mockDevice);
      expect(service.create).toHaveBeenCalledWith(deviceDto);
    });
  });

  describe('update', () => {
    it('should call DeviceService.update with the correct id and payload and return the result', async () => {
      const updateDeviceDto: UpdateDeviceDto = { name: 'Updated Device' };
      mockDeviceService.update.mockResolvedValue({
        ...mockDevice,
        ...updateDeviceDto,
      });

      const result = await controller.update(mockDeviceId, updateDeviceDto);
      expect(result).toEqual({ ...mockDevice, ...updateDeviceDto });
      expect(service.update).toHaveBeenCalledWith(
        mockDeviceId,
        updateDeviceDto,
      );
    });
  });

  describe('remove', () => {
    it('should call DeviceService.remove with the correct id', async () => {
      mockDeviceService.remove.mockResolvedValue(undefined);

      await controller.remove(mockDeviceId);
      expect(service.remove).toHaveBeenCalledWith(mockDeviceId);
    });
  });
});
