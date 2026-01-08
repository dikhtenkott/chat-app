import { useEffect, useRef, useState } from "react";
import type { Message } from "../types";
import MessageBubble from "./MessageBubble";
import { AUTHOR } from "../constants";

interface MessageListProps {
  onScrollTop?: () => void;
  messages: Message[];
  isLoading?: boolean;
}

export default function MessageList({
  onScrollTop,
  messages,
  isLoading,
}: MessageListProps) {
  const messagesRef = useRef<null | HTMLDivElement>(null);

  const [lastHeight, setLastHeight] = useState<number>(0);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [isScrollDownVisible, setIsScrollDownVisible] = useState(false);

  useEffect(() => {
    if (!messagesRef.current) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = messagesRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      return;
    }

    if (lastHeight) {
      if (scrollTop === 0) {
        const diff = scrollHeight - lastHeight;
        messagesRef.current.scrollTop = diff;
      }
    }
  }, [lastHeight]);

  const handleScroll = async () => {
    if (messagesRef.current) {
      const scrollThreshold = 5;
      const isAtBottom =
        messagesRef.current.scrollHeight - messagesRef.current.scrollTop <=
        messagesRef.current.clientHeight + scrollThreshold;
      const isAtTop = messagesRef.current.scrollTop === 0;
      setIsAutoScrollEnabled(isAtBottom);

      setIsScrollDownVisible(
        messagesRef.current.scrollHeight - messagesRef.current.scrollTop >
          messagesRef.current.clientHeight + 5
      );

      if (!isAtBottom) {
        setIsAutoScrollEnabled(false);
      }

      if (isAtTop) {
        setLastHeight(messagesRef.current.scrollHeight);
        if (onScrollTop) {
          onScrollTop();
        }
      }
    }
  };

  const scrollToBottom = (smooth?: boolean) => {
    if (messagesRef.current) {
      const scrollEl = messagesRef.current;
      scrollEl?.scroll({
        top: scrollEl?.scrollHeight,
        behavior: smooth ? "smooth" : "instant",
      });
    }
  };

  useEffect(() => {
    if (isAutoScrollEnabled) {
      scrollToBottom();
    }
  }, [messages, isAutoScrollEnabled]);
  return (
    <div
      className="flex w-full h-full flex-1 flex-col overflow-y-auto overflow-x-hidden relative gap-4"
      onScroll={handleScroll}
      ref={messagesRef}
    >
      {isLoading && <div className="m-auto">Loading...</div>}
      <div className="mx-auto flex w-full max-w-[640px] flex-col p-6 gap-4">
        {messages?.map((item) => (
          <MessageBubble
            key={item._id}
            message={item}
            isOwn={item.author === AUTHOR}
          />
        ))}
      </div>
      {isScrollDownVisible && (
        <button
          role="button"
          aria-label="Scroll to bottom"
          className="fixed cursor-pointer right-4 bottom-20 text-4xl"
          onClick={() => scrollToBottom(true)}
        >
          ⬇️
        </button>
      )}
    </div>
  );
}
