import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminSignupDto } from './dto/create-admin-signup.dto';
import { UpdateAdminSignupDto } from './dto/update-admin-signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminSignup } from './entities/admin-signup.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AdminSignupService {
  constructor(
    @InjectRepository(AdminSignup) private readonly adminRepository: Repository<AdminSignup>
  ) { }
  async create(dto: CreateAdminSignupDto) {
    const isAdminExist = await this.adminRepository.findOne({ where: { email: dto.email } })
    if (isAdminExist) throw new ConflictException("Admin with this Email already exist")

    const newAdmin = this.adminRepository.create({
      ...dto,
    })

    await this.adminRepository.save(newAdmin)
    return { message: "Admin Created successfully!" }
  }

  findAll() {
    return this.adminRepository.find()
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id } })
    if (!admin) throw new NotFoundException("Admin does not Found")
    return admin
  }

  async findByEmail(email: string): Promise<AdminSignup | null> {
    return this.adminRepository.findOne({ where: { email } });
  }

  async update(id: number, updateAdminSignupDto: UpdateAdminSignupDto) {
    const updateAdmin = await this.adminRepository.findOne({where: {id}})
    if(!updateAdmin) throw new NotFoundException("Admin Not Found")
        
  }

  remove(id: number) {
    const deleteAdmin = this.adminRepository.delete(id)
    if (!deleteAdmin) throw new NotFoundException("Admin Fot FOund")
    return { message: "Admin Deleted" }
  }
}
