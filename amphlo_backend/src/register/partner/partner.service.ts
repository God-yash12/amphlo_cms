import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner) private readonly partnerRepository: Repository<Partner>
  ) { }
  async create(createPartnerDto: CreatePartnerDto) {
    const checkEmail = await this.partnerRepository.findOne({ where: { email: createPartnerDto.email } })
    const checkPhone = await this.partnerRepository.findOne({ where: { phone: createPartnerDto.phone } })
    if (checkEmail) throw new ConflictException(`User with this email already exists!!`)
    if (checkPhone) throw new ConflictException(`User with this  Phone is already exist`)
    const partnerRegister = await this.partnerRepository.create(createPartnerDto)
    await this.partnerRepository.save(partnerRegister)
    return {message: "Partner Account Created Wait for Approval"}
  }

  async findAll() {
   const partners = await this.partnerRepository.find();
   return partners;
  }

  findOne(id: number) {
    return `This action returns a #${id} partner`;
  }

  update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return `This action updates a #${id} partner`;
  }

  async remove(email: string): Promise<void> {
    const result = await this.partnerRepository.delete(email);
    if (result.affected === 0) {
      throw new NotFoundException(`Partner with email ${email} not found`);
    }
  }
}
