import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}
  create(createContactDto: CreateContactDto) {
    const contact = this.contactRepository.create(createContactDto);
    console.log(contact)
    return this.contactRepository.save(contact);

  }

  findAll() {
    return this.contactRepository.find();
  }

  findOne(id: number) {
    return this.contactRepository.findOneBy({ id });
  }


  update(id: number, updateContactDto: UpdateContactDto) {
    return this.contactRepository.update(id, updateContactDto);
  }


  remove(id: number) {
    return this.contactRepository.delete(id);
  }

}
