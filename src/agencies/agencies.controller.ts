import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { Agency } from "src/core/models/agency.dto";
import { CreateAgencyDto } from "src/core/models/create-agency.dto";
import { AgenciesService } from "./agencies.service";
import { ApiKeyGuard } from './api-key.guard';

@Controller("agencies")
@UseGuards(ApiKeyGuard)
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  getAll(): Agency[] {
    return this.agenciesService.selectAll();
  }
  @Get("/:id")
  getById(@Param("id") id: string) {
    return this.agenciesService.findById(id);
  }
  @Post()
  postAgency(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    agency: CreateAgencyDto,
  ): Agency {
    return this.agenciesService.insert(agency);
  }
}