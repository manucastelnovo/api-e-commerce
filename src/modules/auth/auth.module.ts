import { CryptoModule } from '@akanass/nestjsx-crypto';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
    imports: [
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: 60 * 60 * 24 * 28,
                },
            }),
            inject: [ConfigService],
        }),
        forwardRef(() => UsersModule),
        CryptoModule,
    ],
    controllers: [AuthController],
    providers: [AuthRepository, AuthService, AuthStrategy, ConfigService],
    exports: [AuthStrategy, PassportModule, AuthService],
})
export class AuthModule {}
