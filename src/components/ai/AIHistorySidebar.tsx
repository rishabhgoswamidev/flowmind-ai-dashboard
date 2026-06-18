"use client";

import { ArrowLeft, Plus, EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import Menu from "./Menu";

const AIHistorySidebar = () => {
  const router = useRouter();
  const {
    conversations,
    setConversations,
    activeConversationId,
    setActiveConversationId,
  } = useAppStore();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef(null);

  const handleNewChat = () => {
    const conversation = {
      id: Date.now(),
      title: "New Chat",
      createdAt: new Date().toISOString(),
      messages: [],
    };

    setConversations([conversation, ...conversations]);
    setActiveConversationId(conversation.id);
  };

  const handleRecentChats = (id: number) => {
    setActiveConversationId(id);
  };

  const onDelete = (id: number) => {
    const updatedConversations = conversations.filter(
      (convo) => convo.id !== id,
    );

    setConversations(updatedConversations);

    if (activeConversationId === id) {
      setActiveConversationId(
        updatedConversations.length > 0 ? updatedConversations[0].id : null,
      );
    }

    setOpenMenuId(null);
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-[250px] flex-col border-r bg-gray-100 md:flex">
      <div className="border-b p-4">
        <Link
          href="/dashboard"
          className="flex cursor-pointer items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="logo Image"
            width={32}
            height={32}
            className="object-contain"
          />

          <p className="text-2xl font-bold">FlowMind AI</p>
        </Link>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 flex w-full cursor-pointer items-center gap-2 rounded-md border p-3"
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        <button
          onClick={handleNewChat}
          className="mt-2 flex w-full cursor-pointer items-center gap-2 rounded-md border p-3"
        >
          <Plus size={18} />
          <span className="text-base">New Chat</span>
        </button>

        <h2 className="mt-4 font-semibold">Recent Chats</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {conversations.map((item) => (
          <div
            key={item.id}
            className={`group flex w-full items-center justify-between gap-3 rounded-md p-2 transition border cursor-pointer ${
              activeConversationId === item.id
                ? "border-gray-300 bg-white"
                : "border-transparent hover:border-gray-300 hover:bg-white"
            }`}
          >
            <button
              className="cursor-pointer text-left "
              onClick={() => handleRecentChats(item.id)}
            >
              {item.title}
            </button>
            <div className="opacity-0 relative group-hover:opacity-100 transition-opacity rounded-lg p-1 hover:bg-gray-200">
              <div className="relative cursor-pointer">
                <button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === item.id ? null : item.id);
                  }}
                >
                  <EllipsisVertical size={14} />
                </button>

                {openMenuId === item.id && (
                  <Menu onDelete={() => onDelete(item.id)} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default AIHistorySidebar;
