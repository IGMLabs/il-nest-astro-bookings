import { Module } from "@nestjs/common";
import { AgenciesModule } from "./agencies/agencies.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from "./auth/auth.controller";

@Module({
  imports: [CoreModule, AgenciesModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
