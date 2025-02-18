import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { filterCriteria } from 'src/utils/filter-criteria';
import { Repository } from 'typeorm';

import { UsersDto, UserSearchCriteriaDto } from './dto/users.dto';
import { Users } from './users.entity';
import { UserRoles } from './users-roles.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}
    logger = new Logger('Users');

    async registerUser(userDto: UsersDto): Promise<Users> {
        try {
            const { firstName, lastName, email, password, phoneNumber, role, status } = userDto;
            const user = new Users();
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.password = password;
            user.phoneNumber = phoneNumber;

            if (role && role !== UserRoles.ADMIN) {
                user.role = role;
            }

            if (status) {
                user.status = status;
            }

            return await user.save();
        } catch (err) {
            this.logger.error('RegisterUser', err.stack, err);

            if (err.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Correo electrónico ya registrado');
            }

            throw new BadRequestException('Error al crear usuario');
        }
    }

    async updateUser(userId: number, userDto: Partial<Users>) {
        try {
            const user = await this.usersRepository.findOneBy({ id: userId });

            if (!user) {
                throw new NotFoundException('No se encuentra el usuario');
            }

            if (userDto.password) {
                userDto.password = await bcrypt.hash(userDto.password, 10);
            }

            Object.assign(user, userDto);

            return await user.save();
        } catch (err) {
            this.logger.error('UpdateUser', err.stack, err);
            throw new Error('Error al editar el usuario');
        }
    }

    async getAllUsers(): Promise<Users[]> {
        try {
            return await this.usersRepository.find();
        } catch (err) {
            this.logger.error('GetAllUsers', err.stack, err);
            throw new InternalServerErrorException('Error al obtener los usuarios');
        }
    }
    async getUserById(userId: number): Promise<Users> {
        try {
            const user = await this.usersRepository.findOneBy({ id: userId });
            if (!user) {
                throw new NotFoundException('Usuario no encontrado');
            }
            return user;
        } catch (err) {
            this.logger.error('GetUserById', err.stack, err);
            if (err instanceof NotFoundException) {
                throw err;
            }
            throw new InternalServerErrorException('Error al obtener el usuario');
        }
    }

    async getUsersByCriteria(criteria: UserSearchCriteriaDto): Promise<Users[]> {
        try {
            const queryCriteria = filterCriteria(criteria);
            const users = await this.usersRepository.find({ where: queryCriteria });
            if (!users.length) {
                throw new NotFoundException('No se encuentran usuarios con los criterios especificados');
            }
            return users;
        } catch (err) {
            this.logger.error('GetUsersByCriteria', err.stack, err);
            if (err instanceof NotFoundException) {
                throw err;
            }
            throw new InternalServerErrorException('Error al obtener los usuarios');
        }
    }
}
