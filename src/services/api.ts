import type { PostMessageRequest, ErrorResponse, Message, MessageParams } from '../types';

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

export async function getMessages(params?: MessageParams): Promise<Message[]> {
  const url = buildQuery(new URL(`${BASE_URL}/messages`), params);
  const response = await fetch(url, { headers: apiHeaders });
  return handleResponse(response);
}

export async function postMessage(data: PostMessageRequest): Promise<Message> {
  const response = await fetch(`${BASE_URL}/messages`, {
    method: 'POST',
    headers: apiHeaders,
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

function buildQuery(url: URL, params?: MessageParams): URL {
  if (params?.after) {
    url.searchParams.set('after', params.after);
  } else if (params?.before) {
    url.searchParams.set('before', params.before);
  }

  if (params?.limit != null) {
    url.searchParams.set('limit', params.limit.toString());
  }
  return url;
}
