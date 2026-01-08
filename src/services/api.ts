import type { CreateMessageRequest, ErrorResponse, Message } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const TOKEN = import.meta.env.VITE_API_TOKEN as string;

const apiHeaders = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
      const errorData:ErrorResponse = await response.json().catch(() => ({}));
      if(errorData && typeof errorData === 'object' && 'error' in errorData && typeof errorData.error === 'string') {
        throw new Error(errorData.error);
      }
      throw new Error(`API error ${response.status}: ${response.statusText}`);

  }
  return response.json();
}


export async function getMessages(): Promise<Message[]> {
  const response = await fetch(`${BASE_URL}/messages`, { headers: apiHeaders });
  return handleResponse(response);
}

export async function postMessage(data: CreateMessageRequest): Promise<Message> {
  const response = await fetch(`${BASE_URL}/messages`, {
    method: 'POST',
    headers: apiHeaders,
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}
