import { Controller, Get, Query } from '@nestjs/common';
import { AnalysisService } from '../service/analysis.service';

@Controller('analyze')
export class AppController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get()
  async analyze(@Query('url') url: string) {
    return this.analysisService.analyzeVideo(url);
  }
}
