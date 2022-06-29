import { MiddlewareConsumer, Module } from '@nestjs/common';
import { Throttle, ThrottlerModule } from '@nestjs/throttler';
import helmet from 'helmet';
import { MonitorMiddleware } from './middlewares/monitor.middleware';
import { UtilsService } from './utils/utils.service';

@Module({
  imports: [ThrottlerModule.forRoot({ttl:60, limit:10})],
  providers: [UtilsService],
  exports: [UtilsService]
})
export class CoreModule {
    public configure(consumer: MiddlewareConsumer){
        consumer.apply(helmet()).forRoutes("*")
        consumer.apply(MonitorMiddleware).forRoutes("*");
    }
}
