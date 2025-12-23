
export type FileCategory = 'image' | 'pdf' | 'document' | 'audio' | 'video' | 'archive' | 'text';

export interface FileFormat {
  extension: string;
  label: string;
}

export interface ConversionTool {
  id: string;
  title: string;
  description: string;
  category: FileCategory;
  icon: string;
  supportedInputs: string[];
  supportedOutputs: string[];
}

export enum AppState {
  IDLE = 'IDLE',
  UPLOADED = 'UPLOADED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface ProcessingFile {
  id: string;
  file: File;
  previewUrl?: string;
  status: 'pending' | 'converting' | 'completed' | 'error';
  progress: number;
  outputFormat?: string;
  resultUrl?: string;
  customName?: string;
  error?: string;
}
