import { OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { CustomersService } from './customers.service';

@Processor('entries-processor')
export class CustomerProcessor {
    constructor(private readonly customerService: CustomersService) {}
    logger = new Logger('CustomerProcessor');

    @Process('eban')
    async ebanEntryRegister(job: Job) {
        try {
            this.logger.debug(`STARTED WORKING WITH ${job.id} at ${new Date()}`);

            const data = await this.customerService.ebanAddEntry(job.data);

            job.progress(100);

            console.log(data);

            return data;
        } catch (error) {
            this.logger.error(error);

            throw new Error(
                `Error al agregar registro en ${error.stack} #${job.id} con resultado ${JSON.stringify(error)}`,
            );
        }
    }

    @OnQueueFailed()
    onFailed(job: Job) {
        this.logger.error(`FAILED QUEUE ${job.id} for ${job.name}`);
    }

    @OnQueueCompleted()
    onCompleted(job: Job) {
        this.logger.verbose(`COMPLETED QUEUE ${job.id} for ${job.name} at ${new Date()}`);
    }
}
