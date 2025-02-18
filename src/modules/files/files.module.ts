import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { FilesController } from './files.controller';
import { FilesRepository } from './files.repository';
import { FilesService } from './files.service';

@Module({
    controllers: [FilesController],
    providers: [FilesService, FilesRepository],
    imports: [AuthModule],
    exports: [FilesService],
})
export class FilesModule {}
