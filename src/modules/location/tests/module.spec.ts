import { Test, TestingModule } from '@nestjs/testing';
import { TrafficService } from '../../external/gov/traffic/service';
import { WeatherService } from '../../external/gov/weather/service';
import { TLocationResponse } from '../data-domains';
import { LocationService } from '../service';
import { DateTimeFormatter, LocalDateTime } from '@js-joda/core';
import { Locale } from '@js-joda/locale';

// Mock the TrafficService and WeatherService
const mockTrafficService = {
  getTraffic: jest.fn(),
};

const mockWeatherService = {
  getForecasts: jest.fn(),
};

const mockDateTime = LocalDateTime.parse('2023-09-17T12:00:00');
const mockDateTimeString = mockDateTime.format(
  DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss").withLocale(Locale.US),
);

const mockDateTime2 = LocalDateTime.parse('2023-09-18T13:00:00');
const mockDateTimeString2 = mockDateTime2.format(
  DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss").withLocale(Locale.US),
);

// NOTE: help from cgpt on writing parts of the tests
describe('LocationService', () => {
  let locationService: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: TrafficService,
          useValue: mockTrafficService,
        },
        {
          provide: WeatherService,
          useValue: mockWeatherService,
        },
      ],
    }).compile();

    locationService = module.get<LocationService>(LocationService);
    jest
      .spyOn(LocalDateTime, 'now')
      .mockReturnValue(LocalDateTime.parse('2023-09-17T12:00:00'));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(locationService).toBeDefined();
  });

  describe('getLocations', () => {
    it('should return location data', async () => {
      // Arrange: Mock external service responses
      const trafficResponse = {
        items: [
          {
            cameras: [
              {
                location: {
                  latitude: 1.23,
                  longitude: 4.56,
                },
              },
              // Add more camera data as needed
            ],
          },
        ],
      };

      const weatherResponse = {
        items: [
          {
            forecasts: [
              {
                area: 'Ang Mo Kio',
                forecast: 'Fair (Day)',
              },
            ],
          },
        ],
        area_metadata: [
          {
            name: 'Ang Mo Kio',
            label_location: {
              latitude: 1.375,
              longitude: 103.839,
            },
          },
        ],
      };

      mockTrafficService.getTraffic.mockResolvedValue(trafficResponse);
      mockWeatherService.getForecasts.mockResolvedValue(weatherResponse);

      // Act: Call the getLocations method
      const result: TLocationResponse[] = await locationService.getLocations();

      expect(mockTrafficService.getTraffic).toHaveBeenCalledWith(
        mockDateTimeString,
      );
      expect(mockWeatherService.getForecasts).toHaveBeenCalledWith(
        mockDateTimeString,
      );

      // Assert: Verify the result
      expect(result).toHaveLength(1); // Adjust the length based on your mock data
      // Add more assertions based on your expected data
    });

    // NOTE: gov api seems to always return 1 item, but we should still test for this case
    // NOTE: actual implementation just takes the first item
    it('should return location data when items are more than expected', async () => {
      // Arrange: Mock external service responses
      const trafficResponse = {
        items: [
          {
            cameras: [
              {
                location: {
                  latitude: 1.23,
                  longitude: 4.56,
                },
              },
              // Add more camera data as needed
            ],
          },
          {
            cameras: [
              {
                location: {
                  latitude: 1.23,
                  longitude: 4.56,
                },
              },
              // Add more camera data as needed
            ],
          },
        ],
      };

      const weatherResponse = {
        items: [
          {
            forecasts: [
              {
                area: 'Ang Mo Kio',
                forecast: 'Fair (Day)',
              },
            ],
          },
          {
            forecasts: [
              {
                area: 'Ang Mo Kio',
                forecast: 'Fair (Day)',
              },
            ],
          },
        ],
        area_metadata: [
          {
            name: 'Ang Mo Kio',
            label_location: {
              latitude: 1.375,
              longitude: 103.839,
            },
          },
        ],
      };

      mockTrafficService.getTraffic.mockResolvedValue(trafficResponse);
      mockWeatherService.getForecasts.mockResolvedValue(weatherResponse);

      // Act: Call the getLocations method
      const result: TLocationResponse[] = await locationService.getLocations();

      expect(mockTrafficService.getTraffic).toHaveBeenCalledWith(
        mockDateTimeString,
      );
      expect(mockWeatherService.getForecasts).toHaveBeenCalledWith(
        mockDateTimeString,
      );

      // Assert: Verify the result
      expect(result).toHaveLength(1); // Adjust the length based on your mock data
      // Add more assertions based on your expected data
    });

    it('should throw when camera api returns unexpected response', async () => {
      // Arrange: Mock external service responses
      const trafficResponse = {
        items: [
          {
            unexpectedData: 90,
          },
        ],
      };

      const weatherResponse = {
        items: [
          {
            forecasts: [
              {
                area: 'Ang Mo Kio',
                forecast: 'Fair (Day)',
              },
            ],
          },
        ],
        area_metadata: [
          {
            name: 'Ang Mo Kio',
            label_location: {
              latitude: 1.375,
              longitude: 103.839,
            },
          },
        ],
      };

      mockTrafficService.getTraffic.mockResolvedValue(trafficResponse);
      mockWeatherService.getForecasts.mockResolvedValue(weatherResponse);

      await expect(locationService.getLocations()).rejects.toThrow(
        'cameras.cameras is not iterable',
      );
    });

    it('should skip item when weather api returns unexpected response for the location coordinates', async () => {
      // Arrange: Mock external service responses
      const trafficResponse = {
        items: [
          {
            cameras: [
              {
                location: {
                  latitude: 1.23,
                  longitude: 4.56,
                },
              },
              // Add more camera data as needed
            ],
          },
        ],
      };

      const weatherResponse = {
        items: [
          {
            forecasts: [
              {
                area: 'Ang Mo Kio',
                forecast: 'Fair (Day)',
              },
            ],
          },
        ],
        area_metadata: [
          {
            name: 'Ang Mo Kio',
            label_location: {
              abc: 1.375,
              def: 103.839,
            },
          },
        ],
      };

      mockTrafficService.getTraffic.mockResolvedValue(trafficResponse);
      mockWeatherService.getForecasts.mockResolvedValue(weatherResponse);

      await expect(
        locationService.getLocations(mockDateTimeString2),
      ).resolves.toStrictEqual([]);

      expect(mockTrafficService.getTraffic).toHaveBeenCalledWith(
        mockDateTimeString2,
      );
      expect(mockWeatherService.getForecasts).toHaveBeenCalledWith(
        mockDateTimeString2,
      );
    });

    it('should skip item when camera api returns unexpected response for the locations item', async () => {
      // Arrange: Mock external service responses
      const trafficResponse = {
        items: [
          {
            cameras: [
              {
                location: {
                  abc: 1.23,
                  def: 4.56,
                },
              },
              // Add more camera data as needed
            ],
          },
        ],
      };

      const weatherResponse = {
        items: [
          {
            forecasts: [
              {
                area: 'Ang Mo Kio',
                forecast: 'Fair (Day)',
              },
            ],
          },
        ],
        area_metadata: [
          {
            name: 'Ang Mo Kio',
            label_location: {
              latitude: 1.375,
              longitude: 103.839,
            },
          },
        ],
      };

      mockTrafficService.getTraffic.mockResolvedValue(trafficResponse);
      mockWeatherService.getForecasts.mockResolvedValue(weatherResponse);

      await expect(
        locationService.getLocations(mockDateTimeString2),
      ).resolves.toStrictEqual([]);
      expect(mockTrafficService.getTraffic).toHaveBeenCalledWith(
        mockDateTimeString2,
      );
      expect(mockWeatherService.getForecasts).toHaveBeenCalledWith(
        mockDateTimeString2,
      );
    });

    it('should throw when forecast response has unexpected format', async () => {
      // Arrange: Mock external service responses
      const trafficResponse = {
        items: [
          {
            cameras: [
              {
                location: {
                  latitude: 1.23,
                  longitude: 4.56,
                },
              },
              // Add more camera data as needed
            ],
          },
        ],
      };

      const weatherResponse = {
        items: [
          {
            forecasts: [
              {
                area: 'Ang Mo Kio',
                forecast: 'Fair (Day)',
              },
            ],
          },
        ],
        // NOTE: area_metadata has no elements
        area_metadata: [],
      };

      mockTrafficService.getTraffic.mockResolvedValue(trafficResponse);
      mockWeatherService.getForecasts.mockResolvedValue(weatherResponse);

      await expect(locationService.getLocations()).rejects.toThrow(
        'Assumption is wrong, forecasts and readable locations do not match',
      );
    });

    // NOTE: these 2 cases should happen when we pass in a weird date_time
    it('should handle traffic api error gracefully', async () => {
      // Arrange: Mock external service responses to throw an error
      mockTrafficService.getTraffic.mockRejectedValue(
        new Error('Traffic error'),
      );

      await expect(locationService.getLocations()).rejects.toThrow(
        'Traffic error',
      );
      expect(mockTrafficService.getTraffic).toHaveBeenCalledWith(
        mockDateTimeString,
      );
    });

    it('should handle weather api error gracefully', async () => {
      // Arrange: Mock external service responses to throw an error
      mockWeatherService.getForecasts.mockRejectedValue(
        new Error('Weather error'),
      );

      await expect(locationService.getLocations()).rejects.toThrow(
        'Weather error',
      );
      expect(mockWeatherService.getForecasts).toHaveBeenCalledWith(
        mockDateTimeString,
      );
    });
  });
});
