import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import OpenAI from 'openai';
import { VideoAnalysis } from '../domain/video-analysis.interface';

@Injectable()
export class AnalysisService {
  private youtube = google.youtube('v3');
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async analyzeVideo(url: string): Promise<VideoAnalysis> {
    const videoId = this.extractVideoId(url);
    const comments = await this.fetchComments(videoId);
    return await this.getAIAnalysis(comments);
  }

  private extractVideoId(url: string): string {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (!match || match[2].length !== 11) {
      throw new Error(`Invalid YouTube URL: ${url}`);
    }
    return match[2];
  }

  private async fetchComments(videoId: string): Promise<string[]> {
    const response = await this.youtube.commentThreads.list({
      part: ['snippet'],
      videoId: videoId,
      maxResults: 50,
      key: process.env.GOOGLE_API_KEY,
    });
    return (response.data.items ?? [])
      .map((i) => i.snippet?.topLevelComment?.snippet?.textDisplay)
      .filter((text): text is string => !!text);
  }

  private async getAIAnalysis(comments: string[]): Promise<VideoAnalysis> {
    const prompt = `Analyze these YouTube comments. Return ONLY a JSON object with this structure:
    {
      "sentimentSummary": "string",
      "emojiScale": "string (e.g. 🟢🟢🟢⚪⚪)",
      "topQuestions": ["string"],
      "criticalFeedback": ["string"]
    }
    Comments: ${comments.join('\n')}`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('OpenAI returned an empty response');
    }

    return JSON.parse(content) as VideoAnalysis;
  }
}
