import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CommonResponseType, ApiResponse } from "./dtos/Response.dto";
import { WeatherService } from "./weather.service";
import { WeatherDataDto } from "./dtos/weather.dto";

@ApiTags("weather")
@Controller({
  path: "weather",
  version: "1",
})
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiResponse({
    model: WeatherDataDto,
    type: "object",
    description: "Weather!",
  })
  @Get()
  public async get(@Query("q") q: string): Promise<
    CommonResponseType<{
      location: string;
      tempFarhenite: number;
      tempCelcius: number;
    }>
  > {
    if (q === undefined)
      throw new BadRequestException("Query cannot be Empty", {
        cause: new Error(),
        description: "Query should be defined, ex: London",
      });

    try {
      const weather = await this.weatherService.getWeather(q);

      return {
        success: true,
        data: {
          location: weather.location.name,
          tempCelcius: weather.current.temp_c,
          tempFarhenite: weather.current.temp_f,
        },
        meta: undefined,
        message: "Weather fetched successfully!",
      };
    } catch (error) {
      let errorMessage = "Error occured";

      if (typeof error === "string" || error instanceof String)
        errorMessage = `${error}`;

      throw new InternalServerErrorException("Something went wrong", {
        description: errorMessage,
        cause: "External API Error",
      });
    }
  }
}
