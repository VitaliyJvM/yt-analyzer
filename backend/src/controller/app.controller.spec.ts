import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AnalysisService } from '../service/analysis.service';

describe('AppController', () => {
  let appController: AppController;
  let analysisService: AnalysisService;

  beforeEach(async () => {
    // 1. Create a mock service instead of using the real one
    const mockAnalysisService = {
      analyzeVideo: jest.fn().mockResolvedValue({
        sentimentSummary: 'Mock summary',
        emojiScale: '🟢🟢🟢⚪⚪',
        topQuestions: ['Mock question?'],
        criticalFeedback: ['Mock feedback'],
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      // 2. Provide the mock instead of the actual class
      providers: [
        {
          provide: AnalysisService,
          useValue: mockAnalysisService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    analysisService = app.get<AnalysisService>(AnalysisService);
  });

  describe('root', () => {
    // 3. Mark the test as async
    it('should return a video analysis', async () => {
      const urlValue = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      const analyzeSpy = jest.spyOn(analysisService, 'analyzeVideo');

      // 4. Await the result and compare it to the expected object structural shape
      const result = await appController.analyze(urlValue);

      expect(result).toEqual({
        sentimentSummary: 'Mock summary',
        emojiScale: '🟢🟢🟢⚪⚪',
        topQuestions: ['Mock question?'],
        criticalFeedback: ['Mock feedback'],
      });

      // 5. Ensure the spy was called with the correct argument
      expect(analyzeSpy).toHaveBeenCalledWith(urlValue);
    });
  });
});
