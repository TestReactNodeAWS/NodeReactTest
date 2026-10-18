import axios from 'axios';

// The backend answers failed requests with { "error": "..." } (see packages/backend/src/app.ts).
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as { error?: string } | undefined;
    return body?.error ?? error.message;
  }
  return error instanceof Error ? error.message : 'Something went wrong';
}
