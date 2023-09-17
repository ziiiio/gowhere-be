import { Injectable } from '@nestjs/common';
import { TrafficService } from '../external/gov/traffic/service';
import { WeatherService } from '../external/gov/weather/service';
import { TLocationResponse } from './data-domains';
import { PriorityQueue } from '../../helpers/data-structures/priority-queue/priority-queue';
import { DateTimeFormatter, LocalDateTime } from '@js-joda/core';
import { Locale } from '@js-joda/locale'; // Import the locale package

@Injectable()
export class LocationService {
  constructor(
    protected readonly trafficService: TrafficService,
    protected readonly weatherService: WeatherService,
  ) {}

  async getLocations(date_time?: string): Promise<any> {
    let dateTime = date_time;
    if (!dateTime) {
      dateTime = LocalDateTime.now().format(
        DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss").withLocale(
          Locale.US,
        ),
      );
    }

    const trafficLocations = await this.trafficService.getTraffic(dateTime);
    const weatherForecasts = await this.weatherService.getForecasts(dateTime);

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

        if (!lat || !lng) {
          continue;
        }

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
      if (!latitude || !longitude) {
        continue;
      }

      // NOTE: n should be constant, will incur log(n) operation as we heapify, hence nlog(n)
      // NOTE: get the first closest location, no need to pop, it will incur heapify operation
      const closestLocationIndex = getClosestLocationIndex(latitude, longitude);
      // NOTE: if no closest location, skip; since we can't display a friendly name anyways
      // NOTE: make sure it is not 0, since 0 is a valid index
      if (!closestLocationIndex && closestLocationIndex !== 0) {
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
