import {Module} from '@nestjs/common';
import {EmployerController} from './employer.controller';
import { EmployerService } from './employer.service';

@Module({
    imports: [],
    providers: [EmployerService,EmployerController],
    controllers: [EmployerController],
})
export class EmployerModule { }