import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const TypeOrmRootModule = TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('TYPEORM_HOST'),
        port: Number(configService.get('TYPEORM_PORT')),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        synchronize: false,
        logging: false,
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
        ssl: configService.get('POSTGRES_SSL') === 'true' ? { rejectUnauthorized: false } : undefined,
        namingStrategy: new SnakeNamingStrategy(),
    }),
});

@Module({
    imports: [TypeOrmRootModule],
    exports: [TypeOrmRootModule],
})
export class DatabaseModule {}
