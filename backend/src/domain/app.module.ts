import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../controller/app.controller';
import { AnalysisService } from '../service/analysis.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AnalysisService],
})
export class AppModule {}
