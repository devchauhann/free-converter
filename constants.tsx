
import React from 'react';
import { ConversionTool } from './types';

export const TOOLS: ConversionTool[] = [
  {
    id: 'image-converter',
    title: 'Image Studio',
    description: 'Professional grade image processing for JPG, PNG, WEBP, and raw formats.',
    category: 'image',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>`,
    supportedInputs: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'heic', 'avif', 'svg', 'heif'],
    supportedOutputs: ['jpg', 'png', 'webp', 'bmp', 'pdf', 'svg']
  },
  {
    id: 'pdf-tools',
    title: 'PDF Engine',
    description: 'Convert, compress, and secure PDF documents with enterprise speed.',
    category: 'pdf',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>`,
    supportedInputs: ['pdf', 'docx', 'xlsx', 'pptx', 'doc', 'xls', 'ppt'],
    supportedOutputs: ['pdf', 'docx', 'xlsx', 'pptx', 'jpg', 'png', 'txt', 'html', 'svg']
  },
  {
    id: 'video-converter',
    title: 'Motion & GIF',
    description: 'High-speed video transcoding and animated GIF creation.',
    category: 'video',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`,
    supportedInputs: ['mp4', 'mkv', 'avi', 'mov', 'webm', 'flv', 'm4v'],
    supportedOutputs: ['mp4', 'webm', 'mov', 'gif', 'mp3']
  },
  {
    id: 'audio-converter',
    title: 'Audio Suite',
    description: 'Lossless audio conversion and bitrate optimization.',
    category: 'audio',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303A2.25 2.25 0 0 1 7.368 17.72l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 11.803V9Z" /></svg>`,
    supportedInputs: ['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a', 'wma', 'opus'],
    supportedOutputs: ['mp3', 'wav', 'ogg', 'm4a', 'flac']
  },
  {
    id: 'document-converter',
    title: 'Paperless Flow',
    description: 'Sync and convert documents between Word, Markdown, and PDF.',
    category: 'document',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>`,
    supportedInputs: ['doc', 'docx', 'odt', 'rtf', 'txt', 'html', 'md', 'epub'],
    supportedOutputs: ['pdf', 'docx', 'txt', 'html', 'md', 'epub']
  },
  {
    id: 'data-converter',
    title: 'Data Flow',
    description: 'Structure and transform JSON, XML, CSV, and code snippets.',
    category: 'text',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>`,
    supportedInputs: ['json', 'xml', 'csv', 'yaml', 'txt', 'sql', 'toml'],
    supportedOutputs: ['json', 'xml', 'csv', 'yaml', 'txt']
  }
];

export const CATEGORY_COLORS: Record<string, string> = {
  image: 'bg-[#1a1a1a]',
  pdf: 'bg-[#1a1a1a]',
  document: 'bg-[#1a1a1a]',
  audio: 'bg-[#1a1a1a]',
  video: 'bg-[#1a1a1a]',
  archive: 'bg-[#1a1a1a]',
  text: 'bg-[#1a1a1a]'
};
