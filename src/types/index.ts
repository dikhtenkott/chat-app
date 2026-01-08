export interface Message {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
}

export interface CreateMessageRequest {
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
