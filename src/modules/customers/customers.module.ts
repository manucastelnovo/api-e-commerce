import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesModule } from '../files/files.module';
import { CustomersController } from './customers.controller';
import { CustomerProcessor } from './customers.processor';
import { CustomersService } from './customers.service';
import { Addresses } from './entities/addresses.entity';
import { Customers } from './entities/customers.entity';
import { EbanCustomerStatus } from './entities/eban-customers-status.entity';
import { OperationCharges } from './entities/operation-charges.entity';
import { OperationComments } from './entities/operation-comments.entity';
import { OperationDocuments } from './entities/operation-documents.entity';
import { OperationDocumentsType } from './entities/operation-documents-type.entity';
import { OperationInformconf } from './entities/operation-informconf.entity';
import { OperationItems } from './entities/operation-items.entity';
import { OperationJobReference } from './entities/operation-job-reference.entity';
import { OperationPersonalReference } from './entities/operation-personal-reference.entity';
import { OperationsResult } from './entities/operations-result.entity';
import { Spouse } from './entities/spouse.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Addresses,
            Customers,
            EbanCustomerStatus,
            OperationCharges,
            OperationComments,
            OperationDocumentsType,
            OperationDocuments,
            OperationItems,
            OperationJobReference,
            OperationPersonalReference,
            OperationsResult,
            Spouse,
            OperationInformconf,
        ]),
        FilesModule,
        BullModule.registerQueueAsync({ name: 'entries-processor' }),
        BullBoardModule.forFeature({
            name: 'entries-processor',
            adapter: BullAdapter,
        }),
    ],
    controllers: [CustomersController],
    providers: [CustomersService, CustomerProcessor],
    exports: [CustomersService],
})
export class CustomersModule {}
