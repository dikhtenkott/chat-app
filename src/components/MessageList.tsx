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

      if (!isAtBottom) {
        setIsAutoScrollEnabled(false);
      }

      if (isAtTop) {
        setLastHeight(messagesRef.current.scrollHeight);
        console.log("load more");
        onScrollTop && onScrollTop();
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
    isAutoScrollEnabled && scrollToBottom();
  }, [messages, isAutoScrollEnabled]);
  return (
    <div
      className="flex w-full h-full flex-1 flex-col overflow-y-auto overflow-x-hidden relative"
      onScroll={handleScroll}
      ref={messagesRef}
    >
      {isLoading && <div className="m-auto">Loading...</div>}
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-7">
        {messages?.map((item) => (
          <MessageBubble
            key={item._id}
            message={item}
            isOwn={item.author === AUTHOR}
          />
        ))}
      </div>
      {messagesRef.current &&
        messagesRef.current.scrollHeight - messagesRef.current.scrollTop >
          messagesRef.current.clientHeight + 5 && (
          <button
            className="fixed cursor-pointer right-2 bottom-14"
            onClick={() => scrollToBottom(true)}
          >
            Bottom
          </button>
        )}
    </div>
  );
}
