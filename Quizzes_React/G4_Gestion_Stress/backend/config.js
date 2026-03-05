import dotenv from 'dotenv';
dotenv.config();

export const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
export const LLM_MODEL = process.env.LLM_MODEL || 'openai/gpt-4o-mini';
export const PORT = process.env.PORT || 5000;
