import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent) 
    private readonly agentRepository: Repository<Agent>
  ) {}

  async set(dto: CreateAgentDto): Promise<Agent> {
    const existing = await this.get();

    if (!existing) {
      return await this.createAgent(dto);
    } else {
      return await this.updateAgent(existing, dto);
    }
  }
  async createAgent(dto: CreateAgentDto): Promise<Agent> {
    const newAgent = this.agentRepository.create({
      title: dto.title,
      description: dto.description,
      process: dto.process || [],
    });

    return await this.agentRepository.save(newAgent);
  }

 
  async updateAgent(existing: Agent, dto: CreateAgentDto): Promise<Agent> {
    Object.assign(existing, {
      title: dto.title,
      description: dto.description,
      process: dto.process || existing.process,
    });

    return await this.agentRepository.save(existing);
  }

  async get(): Promise<Agent | null> {
    return await this.agentRepository.findOne({
      where: { id: Not(IsNull()) },
    });
  }

 
}
