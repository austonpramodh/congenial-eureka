import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { WeatherData, WeatherDataSchema } from "../schemas/weather-data.schema";

import { WeatherController } from "./weather.controller";
import { WeatherService } from "./weather.service";

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: WeatherData.name, schema: WeatherDataSchema },
    ]),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [],
})
export class WeatherModule {}
