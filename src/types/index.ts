export interface Message {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
}

export interface PostMessageRequest {
  message: string;
  author: string;
}

export interface ErrorResponse {
  error: string;
  details?: Array<{
    msg: string;
    param: string;
    location: string;
  }>;
}

export interface MessageParams {
  after?: string;
  limit?: number;
  before?: string;
}
