import { ApiProperty } from "@nestjs/swagger";

export class WeatherDataDto {
  @ApiProperty({
    description: "Location",
  })
  public location: string;

  @ApiProperty({
    description: "Temperature in Celsius",
  })
  public tempCelcius: number;

  @ApiProperty({
    description: "Temperature in Fahrenheit",
  })
  public tempFarhenite: number;
}
