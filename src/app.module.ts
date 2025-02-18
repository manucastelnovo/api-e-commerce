import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as expressBasicAuth from 'express-basic-auth';

import { DatabaseModule } from './database/database.module';
import { BrandsModule } from './modules/brand/brand.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CommonModule } from './modules/common/common.module';
import { CustomersModule } from './modules/customers/customers.module';
import { FilesModule } from './modules/files/files.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        UsersModule,
        FilesModule,
        BrandsModule,
        CategoriesModule,
        CommonModule,
        ProductsModule,
        CatalogsModule,
        CustomersModule,
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                redis: {
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                    password: configService.get('REDIS_PASSWORD'),
                },
            }),
            inject: [ConfigService],
        }),
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                const params = {
                    closeClient: true,
                    config: {
                        host: config.get('REDIS_HOST'),
                        port: config.get('REDIS_PORT'),
                        password: config.get('REDIS_PASSWORD'),
                    },
                } as any;

                return params as RedisModuleOptions;
            },
            inject: [ConfigService],
        }),
        BullBoardModule.forRoot({
            route: '/queues',
            adapter: ExpressAdapter,
            middleware: {},
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                expressBasicAuth({
                    users: { emassiva_admin_queue: 'JJVOues-Y%+d9|175W7|W!' },
                    challenge: true,
                }),
            )
            .forRoutes('/queues');
    }
}
