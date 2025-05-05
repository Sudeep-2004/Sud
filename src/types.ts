export type Language = 'javascript' | 'python' | 'java' | 'cpp' | 'c' | 'rust';

export interface CodeReviewResult {
  suggestions: string[];
  improvedCode: string;
}

export interface LearningModule {
  id: string;
  title: string;
  language: string;
  sections: {
    id: string;
    title: string;
    content?: string;
  }[];
}