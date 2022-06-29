import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CoreModule } from "src/core/core.module";
import { AuthController } from "./auth.controller";
import { AuthService } from './auth.service';

@Module({
  imports: [CoreModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
