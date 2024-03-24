import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class CronService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}
  addInterval(name: string, milliseconds: number, callback: () => void) {
    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(name, interval);
  }
  deleteInterval(name: string) {
    this.schedulerRegistry.deleteInterval(name);
  }
}
