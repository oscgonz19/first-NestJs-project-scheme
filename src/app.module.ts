import { Inject, Module } from '@nestjs/common';
import {UsersModule} from './users/users.module';
import { BullModule } from '@nestjs/bull';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    BullModule.forRoot({
        redis: {
          host:"localhost",
          port: 6379,
        },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
