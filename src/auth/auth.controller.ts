import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Credentials } from "./models/credentials.interface";
import { LoginDto } from "./models/login.dto";
import { RegistrationDto } from "./models/registration.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("registration")
  public postRegistration(@Body() registration: RegistrationDto): Credentials {
    return this.authService.register(registration);
  }

  @Post("login")
  public postLogin(@Body() login: LoginDto): Credentials {
    return this.authService.login(login);
  }
}
