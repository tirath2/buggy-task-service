import { TaskPriorityModule } from './Modules/TaskPriority/task-priority.module';
import { TaskTypeModule } from './Modules/TaskType/task-type.module';
import { SprintModule } from './Modules/Sprint/sprint.module';
import { TaskModule } from './Modules/Task/task.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbdatasource } from 'data.source';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './Modules/Auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { StatusModule } from './Modules/TaskStatus/task-status.module';
import { TemplateModule } from './Modules/Template/template.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    TaskPriorityModule,
    TaskTypeModule,
    ScheduleModule.forRoot(),
    SprintModule,
    TaskModule,
    TemplateModule,
    StatusModule,
    TypeOrmModule.forRoot(dbdatasource),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' }, // Adjust expiration as needed
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
