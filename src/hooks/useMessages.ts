import { useState, useCallback, useEffect } from 'react';
import type { MessageParams, PostMessageRequest, Message } from '../types';
import { getMessages, postMessage } from '../services/api';

interface MessagesState {
  messages: Message[];
  isLoading: boolean;
  isSending: boolean;
  hasMore: boolean;
  oldestTimestamp: string | null;
  error: string | null;
}

export function useMessages(initialLimit = 20): MessagesState & {
  loadMore: () => void;
  sendMessage: (data: PostMessageRequest) => Promise<void>;
} {
  const [state, setState] = useState<MessagesState>({
    messages: [],
    isLoading: true,
    isSending: false,
    hasMore: true,
    oldestTimestamp: null,
    error: null,
  });

  const fetchMessages = useCallback(async (params?: MessageParams) => {
    const limit = params?.limit ?? initialLimit;
    setState(s => ({ ...s, isLoading: true }));
    try {
      const newMessages = await getMessages({ ...params, limit });
      setState(s => ({
        ...s,
        messages: params?.before ? [...newMessages, ...s.messages] : newMessages,
        hasMore: newMessages.length === limit,
        oldestTimestamp: newMessages[0]?.createdAt ?? null,
      }));
    } catch (error) {
      setState(s => ({ ...s, error: error instanceof Error ? error.message : 'Failed to load' }));
    } finally {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, [initialLimit]);

  const loadMore = useCallback(() => {
    if (state.oldestTimestamp && state.hasMore) {
      fetchMessages({ before: state.oldestTimestamp, limit: initialLimit });
    }
  }, [state.oldestTimestamp, state.hasMore, fetchMessages]);

  const sendMessage = useCallback(async (data: PostMessageRequest) => {
    setState(s => ({ ...s, isSending: true }));
    try {
      const newMessage = await postMessage(data);
      setState(s => ({ ...s, messages: [...s.messages, newMessage] }));
    } catch (error) {
      setState(s => ({ ...s, error: error instanceof Error ? error.message : 'Failed to send' }));
      throw error;
    } finally {
      setState(s => ({ ...s, isSending: false }));
    }
  }, []);


  useEffect(() => {
    fetchMessages({ before: new Date().toISOString() });
  }, []);

  return { ...state, loadMore, sendMessage };
}
