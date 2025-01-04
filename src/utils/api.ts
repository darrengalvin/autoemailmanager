import { GraphEmailResponse, ApiError } from '@/types/api';

export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}