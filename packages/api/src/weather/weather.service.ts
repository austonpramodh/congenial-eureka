import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { AxiosError } from "axios";
import { Model } from "mongoose";
import { catchError, firstValueFrom } from "rxjs";

import { WeatherData } from "../schemas/weather-data.schema";

export interface IWeatherAPIResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gustkph: number;
  };
}

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(WeatherData.name) private weatherDataModel: Model<WeatherData>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async getWeather(loc: string): Promise<IWeatherAPIResponse> {
    // Check with DB if theres one previously fetched
    const cache = await this.weatherDataModel
      .findOne({
        location: loc,
      })
      .exec();

    // Check if cache is within 30 mins
    if (cache) {
      const validDuration = 30 * 60 * 1000;

      // @ts-ignore
      if (new Date() - cache.createdAt < validDuration) {
        return cache.data;
      } else {
        await this.weatherDataModel
          .deleteMany({
            location: loc,
          })
          .exec();
      }
    }

    const key = this.configService.get("NESTJS_WEATHER_API_KEY");

    const res = await firstValueFrom(
      this.httpService
        .get<IWeatherAPIResponse>(
          `https://api.weatherapi.com/v1/current.json?key=${key}&q=${loc}&aqi=no`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error.message;
          }),
        ),
    );

    const createdCache = await this.weatherDataModel.create({
      data: res.data,
      location: loc,
    });

    await createdCache.save();

    return res.data;
  }
}
