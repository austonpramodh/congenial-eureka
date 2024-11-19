import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { IWeatherAPIResponse } from "../weather/weather.service";

export type WeatherDataDocument = HydratedDocument<WeatherData>;

@Schema()
export class WeatherData {
  @Prop()
  location: string;

  @Prop({ type: "object" })
  data: IWeatherAPIResponse;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const WeatherDataSchema = SchemaFactory.createForClass(WeatherData);
