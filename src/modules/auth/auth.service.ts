import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersDto } from '../users/dto/users.dto';
import { UsersService } from '../users/users.service';
import { AuthRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');

    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
        private jwtService: JwtService,
        private usersService: UsersService,
        private configService: ConfigService,
    ) {}

    async login(authCredentials: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const email = await this.authRepository.validateUserPassword(authCredentials);

        if (!email) {
            throw new UnauthorizedException('Usuario o contraseña incorrectos');
        }

        const payload: JwtPayload = { email };
        const accessToken = this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

        return { accessToken };
    }

    async register(usersDto: UsersDto): Promise<{ accessToken: string }> {
        try {
            const user = await this.usersService.registerUser(usersDto);

            const payload: JwtPayload = { email: user.email };
            const accessToken = this.jwtService.sign(payload);

            this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

            return { accessToken };
        } catch (error) {
            this.logger.error('RegisterError', error.stack, error);
            if (error.status === 409) {
                throw new ConflictException('Correo electrónico ya registrado');
            }
            throw new InternalServerErrorException('No se pudo crear la cuenta');
        }
    }
}
