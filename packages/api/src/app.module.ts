import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommonModule } from "./common/common.module";
import { WeatherModule } from "./weather/weather.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        // eslint-disable-next-line no-console
        console.log(
          `Using mongoDB Connection - ${configService.get<string>("NESTJS_MONGODB")}`,
        );

        return {
          uri: configService.get<string>("NESTJS_MONGODB"),
        };
      },
      inject: [ConfigService],
    }),
    CommonModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
