import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Patch()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentService.set(createAgentDto);
  }

  @Get()
  findAll() {
    return this.agentService.get();
  }
}
