import { Injectable } from '@nestjs/common';
import { CreatePortalAccessDto } from './dto/create-portal-access.dto';
import { UpdatePortalAccessDto } from './dto/update-portal-access.dto';
import { PortalAccess } from './entities/portal-access.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';
import { Repository, Not, IsNull } from 'typeorm';

@Injectable()
export class PortalAccessService {
  constructor(
    @InjectRepository(PortalAccess) private readonly portalAccessRepo: Repository<PortalAccess>,
  ) { }
  async set(dto: CreatePortalAccessDto) {
    const existing = await this.get()

    if (!existing) return await this.createNew(dto)

    return await this.update(existing, dto)
  }

  async createNew(dto: CreatePortalAccessDto) {
    const newProcess = this.portalAccessRepo.create({
      title: dto.title,
      description: dto.description,
      process: dto.process,
    })
    return await this.portalAccessRepo.save(newProcess)
  }

  async update(existing: PortalAccess, dto: CreatePortalAccessDto) {
    Object.assign(existing, {
      ...dto,
    })
    return await this.portalAccessRepo.save(existing)
  }

  get(): Promise<PortalAccess | null> {
    return this.portalAccessRepo.findOne({
      where: { id: Not(IsNull()) }
    })
  }


  // findAll() {
  //   return `This action returns all portalAccess`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} portalAccess`;
  // }

  // update(id: number, updatePortalAccessDto: UpdatePortalAccessDto) {
  //   return `This action updates a #${id} portalAccess`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} portalAccess`;
  // }
}
