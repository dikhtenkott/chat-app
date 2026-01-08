import { useState, useRef, type KeyboardEvent, useEffect } from "react";
import type { PostMessageRequest } from "../types";
import { AUTHOR } from "../constants";

interface MessageInputProps {
  onSend: (data: PostMessageRequest) => Promise<void>;
  disabled: boolean;
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!message.trim() || disabled) {
      return;
    }

    await onSend({
      message: message.trim(),
      author: AUTHOR,
    });
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (message === "") {
      textareaRef.current?.focus();
    }
  }, [message]);

  return (
    <div className="p-2 bg-sky-600">
      <div className="flex m-auto gap-2 max-w-[640px] px-6">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message"
          className="w-full flex-1 px-2 py-3 rounded bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 resize-none"
          rows={1}
          disabled={disabled}
          aria-label="Message"
        />

        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="p-2 bg-orange-500 cursor-pointer hover:bg-orange-600 transition-colors min-w-[80px] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
}
