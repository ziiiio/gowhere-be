import { Injectable } from '@nestjs/common';
import { TrafficService } from '../external/gov/traffic/service';
import { WeatherService } from '../external/gov/weather/service';
import { TLocationResponse } from './data-domains';
import { PriorityQueue } from '../../helpers/data-structures/priority-queue/priority-queue';

@Injectable()
export class LocationService {
  constructor(
    protected readonly trafficService: TrafficService,
    protected readonly weatherService: WeatherService,
  ) {}

  async getLocations(date_time: string): Promise<any> {
    const trafficLocations = await this.trafficService.getTraffic(date_time);
    const weatherForecasts = await this.weatherService.getForecasts(date_time);
    // NOTE: assume everything is in the first item
    const cameras = trafficLocations.items[0];
    const forecasts = weatherForecasts.items[0].forecasts;
    const readableLocations = weatherForecasts.area_metadata;

    if (forecasts.length !== readableLocations.length) {
      throw new Error(
        'Assumption is wrong, forecasts and readable locations do not match',
      );
    }

    const locationsLength = readableLocations.length;

    const getClosestLocationIndex = (latitude: number, longitude: number) => {
      const priorityQueue = new PriorityQueue<number>();
      for (let i = 0; i < locationsLength; i++) {
        const {
          label_location: { latitude: lat, longitude: lng },
        } = readableLocations[i];

        const distance =
          Math.pow(latitude - lat, 2) + Math.pow(longitude - lng, 2);
        // NOTE: keep the index, use distance as priority
        priorityQueue.insert(i, distance);
      }
      return priorityQueue.peekMin();
    };

    const returnPayload: TLocationResponse[] = [];
    for (const camera of cameras.cameras) {
      const {
        location: { latitude, longitude },
      } = camera;

      // NOTE: n should be constant, will incur log(n) operation as we heapify, hence nlog(n)
      // NOTE: get the first closest location, no need to pop, it will incur heapify operation
      const closestLocationIndex = getClosestLocationIndex(latitude, longitude);
      // NOTE: if no closest location, skip; since we can't display a friendly name anyways
      if (!closestLocationIndex) {
        continue;
      }

      returnPayload.push({
        ...camera,
        ...readableLocations[closestLocationIndex],
        ...forecasts[closestLocationIndex],
      });
    }

    return returnPayload;
  }
}
