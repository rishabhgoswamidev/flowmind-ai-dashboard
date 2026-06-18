"use client";

import { Plus } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import NoteModel from "./NoteModel";
import type { NoteType } from "@/types/dataTypes";
import { useAppStore } from "@/store/useAppStore";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const noteRef = useRef<Record<number, HTMLDivElement | null>>({});
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const [hasOpenedFromSearch, setHasOpenedFromSearch] = useState(false);
  const notes = useAppStore((state) => state.notes);
  const setNotes = useAppStore((state) => state.setNotes);
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");

  useEffect(() => {
    if (!noteId || notes.length === 0) return;

    const id = Number(noteId);

    setHighlightedId(id);

    const highlightTimeout = setTimeout(() => {
      setHighlightedId(null);
    }, 2000);

    if (!hasOpenedFromSearch) {
      const foundNote = notes.find((note) => note.id === id);

      if (foundNote) {
        setSelectedNote(foundNote);

        setTimeout(() => {
          noteRef.current[id]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          setOpen(true);

          setHasOpenedFromSearch(true);
        }, 100);
      }
    }

    return () => clearTimeout(highlightTimeout);
  }, [noteId, notes, hasOpenedFromSearch]);

  const handleNoteOpen = (id: number) => {
    const foundNote = notes.find((item) => item.id === id);

    if (!foundNote) return;

    setSelectedNote(foundNote);

    setOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Notes</h1>

          <p className="mt-2 text-gray-500">
            Add your notes, for better productivity
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedNote(null);

            setOpen(true);
          }}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-3 font-semibold text-white transition hover:shadow-md sm:w-auto"
        >
          <Plus size={20} />

          <span>Add Note</span>
        </button>
      </div>

      {open && <NoteModel setOpen={setOpen} selectedNote={selectedNote} />}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {notes.map((note) => (
          <div
            key={note.id}
            ref={(el) => {
              noteRef.current[note.id] = el;
            }}
            onClick={() => handleNoteOpen(note.id)}
            className={`h-[250px] overflow-hidden rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md md:h-[300px] ${
              highlightedId === note.id ? "ring-2 ring-purple-500" : ""
            } ${note.bgColor}`}
          >
            <div className="h-full overflow-y-auto">
              <p className="whitespace-pre-wrap break-all text-base text-gray-800 md:text-lg">
                {note.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
