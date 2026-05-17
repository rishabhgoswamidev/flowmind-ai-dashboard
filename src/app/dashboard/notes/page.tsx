"use client";

import { Plus } from "lucide-react";

import { useEffect, useState } from "react";
import NoteModel from "./NoteModel";
import { json } from "stream/consumers";

type NoteType = {
  id: number;
  text: string;
  bgColor: string;
};

const page = () => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("Notes Data", JSON.stringify(notes));
  }, [notes, isLoaded]);

  useEffect(() => {
    const saveData = localStorage.getItem("Notes Data");

    if (saveData) {
      setNotes(JSON.parse(saveData));
    }
    setIsLoaded(true);
  }, []);

  const handleNoteOpen = (id: number) => {
    const foundNote = notes.find((item) => item.id === id);
    if (!foundNote) return;
    setSelectedNote(foundNote);
    setOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
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
          className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2 font-semibold text-white transition hover:shadow-md"
        >
          <Plus size={20} />
          Add Note
        </button>
      </div>
      {open && (
        <NoteModel
          setOpen={setOpen}
          setNotes={setNotes}
          selectedNote={selectedNote}
        />
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {notes.map((note) => (
          <div
            onClick={() => handleNoteOpen(note.id)}
            key={note.id}
            className={`h-[300px] overflow-y-auto rounded-xl p-4 shadow-sm hover:shadow-md transition ${note.bgColor}`}
          >
            <p className="whitespace-pre-wrap break-words line-clamp-9 text-lg text-gray-800">
              {note.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
