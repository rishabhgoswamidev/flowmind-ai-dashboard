"use client";

import { useAppStore } from "@/store/useAppStore";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/ai/CodeBlock";

const Ai = () => {
  const { conversations, activeConversationId, setConversations } =
    useAppStore();
  const [input, setInput] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const hasPositionedChat = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId,
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!activeConversation?.messages) return;

    if (!hasPositionedChat.current) {
      messagesEndRef.current?.scrollIntoView();

      hasPositionedChat.current = true;

      return;
    }

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [activeConversation?.messages.length]);

  useEffect(() => {
    hasPositionedChat.current = false;
  }, [activeConversationId]);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;

    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    setShowScrollButton(distanceFromBottom > 200);
  };

  if (!activeConversation) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Create a new chat to get started</p>
      </div>
    );
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    const conversation = conversations.find(
      (conversation) => conversation.id === activeConversationId,
    );

    if (!conversation) return;

    const userMessage = {
      id: Date.now(),
      role: "user" as const,
      content: input,
    };

    const inputLenght = input.length > 20 ? input.slice(0, 20) + "..." : input;

    const title =
      conversation.messages.length === 0
        ? inputLenght
        : conversation.title;
    const updatedConversation = {
      ...conversation,
      title,
      messages: [...conversation.messages, userMessage],
    };

    const updatedConversations = conversations.map((conversation) =>
      conversation.id === activeConversationId
        ? updatedConversation
        : conversation,
    );

    setConversations(updatedConversations);

    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setIsLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
      }),
    });

    const data = await response.json();

    const aiMessage = {
      id: Date.now(),
      role: "assistant" as const,
      content: data.message,
    };

    const latestConversation = updatedConversation;

    const conversationWithAi = {
      ...latestConversation,
      messages: [...latestConversation.messages, aiMessage],
    };

    const finalConversations = updatedConversations.map((conversation) =>
      conversation.id === activeConversationId
        ? conversationWithAi
        : conversation,
    );

    setConversations(finalConversations);

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-semibold">{activeConversation.title}</h1>
      </div>

      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="relative flex-1 overflow-y-auto p-6"
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
          {activeConversation.messages.length === 0 ? (
            <p className="text-gray-500">Send your first message...</p>
          ) : (
            activeConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-full rounded-lg py-3 px-4 ${
                  message.role === "user"
                    ? "ml-auto bg-blue-100"
                    : "bg-gray-100"
                }`}
              >
                <p
                  className={`mb-1 font-medium ${
                    message.role === "user"
                      ? "text-blue-600"
                      : "text-purple-600"
                  }`}
                >
                  {message.role === "user" ? "You" : "FlowMind AI"}
                </p>

                <div
                  className="prose prose-lg max-w-none

    prose-pre:bg-transparent
    prose-pre:p-0
    prose-pre:m-0
    prose-pre:border-0

    prose-code:bg-transparent
    prose-code:p-0
    prose-code:text-inherit

    prose-code:before:content-none
    prose-code:after:content-none
  "
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ className, children }) {
                        const match = /language-(\w+)/.exec(className || "");

                        if (match) {
                          return (
                            <CodeBlock
                              language={match[1]}
                              code={String(children).replace(/\n$/, "")}
                            />
                          );
                        }

                        return (
                          <code className="rounded bg-gray-200 px-1 py-0.5 text-sm">
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="max-w-full rounded-lg bg-gray-100 p-3">
              <p className="mb-1 font-medium text-purple-600">FlowMind AI</p>

              <p>Thinking...</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-28 right-8 z-50 rounded-full bg-blue-500 p-3 text-white shadow-lg transition hover:bg-blue-600 cursor-pointer"
          >
            <ChevronDown size={20} />
          </button>
        )}
      </div>

      <div className="border-t border-gray-200 bg-white p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mx-auto flex max-w-3xl items-end gap-2"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Message FlowMind..."
            rows={1}
            className="flex-1 resize-none overflow-y-auto max-h-[200px] min-h-[44px] rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="cursor-pointer rounded-md bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Ai;
