import MessageInput from "./MessageInput";
import type { PostMessageRequest } from "../types";
import MessageList from "./MessageList";
import { useMessages } from "../hooks/useMessages";

export default function ChatContainer() {
  const { messages, isLoading, isSending, loadMore, sendMessage, error } =
    useMessages(10);

  const handleSend = async (data: PostMessageRequest) => {
    await sendMessage(data);
  };

  return (
    <div className="flex flex-col h-screen bg-[url(/bg.png)]">
      {error && (
        <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm flex items-center justify-between">
          <span>{error}</span>
        </div>
      )}
      <MessageList
        messages={messages}
        isLoading={isLoading}
        onScrollTop={loadMore}
      />

      <MessageInput onSend={handleSend} disabled={isSending} />
    </div>
  );
}
