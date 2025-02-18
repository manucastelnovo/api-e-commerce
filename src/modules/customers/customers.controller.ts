import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

import { EbanOperationDto } from './dto/eban-operation.dto';

@Controller('customers')
export class CustomersController {
    constructor(
        @InjectQueue('entries-processor')
        private readonly customerEntriesProcessor: Queue,
    ) {}

    @Post('/eban')
    async ebanCreateEntry(@Body() ebanDto: EbanOperationDto) {
        return await this.customerEntriesProcessor.add('eban', ebanDto);
    }
}
