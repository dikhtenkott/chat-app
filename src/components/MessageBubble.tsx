import type { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
  isOwn?: boolean;
}

export default function MessageBubble({
  message,
  isOwn = false,
}: MessageBubbleProps) {
  const formattedDate = new Date(message.createdAt).toLocaleString();

  return (
    <div
      className={`flex flex-row ${
        isOwn ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div className="border p-4 max-w-[70%]">
        {!isOwn && (
          <div className="text-xs mb-1 text-gray-400 flex">
            {message.author}
          </div>
        )}
        <div className="text-sm">{message.message}</div>
        <div className="text-xs text-gray-400">{formattedDate}</div>
      </div>
    </div>
  );
}
