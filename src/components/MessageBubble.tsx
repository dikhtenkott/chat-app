import type { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
  isOwn?: boolean;
}

export default function MessageBubble({
  message,
  isOwn = false,
}: MessageBubbleProps) {
  const formattedDate = new Date(message.createdAt).toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );

  return (
    <div className={`flex flex-row ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`border border-gray-300 min-w-[150px] max-w-[70%] pt-4 rounded-lg ${
          isOwn ? "bg-yellow-100" : "bg-white"
        }`}
      >
        {!isOwn && (
          <div className="text-xs px-4 mb-1 text-gray-400 flex">
            {message.author}
          </div>
        )}
        <div className="text-sm px-4 break-words whitespace-pre-wrap">
          {message.message}
        </div>
        <div
          className={`text-xs text-gray-400 ${
            isOwn ? "text-right px-2 pb-2" : "px-4 pb-4"
          }`}
        >
          {formattedDate}
        </div>
      </div>
    </div>
  );
}
