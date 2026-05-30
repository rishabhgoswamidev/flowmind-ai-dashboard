"use client";

import { useState } from "react";
import DeletePopup from "@/components/ui/DeletePopup";

import type { NoteType } from "@/types/dataTypes";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  selectedNote: NoteType | null;
};

const NoteModal = ({ setOpen, setNotes, selectedNote }: Props) => {
  const noteColors = [
    "bg-yellow-100",
    "bg-blue-100",
    "bg-pink-100",
    "bg-green-100",
    "bg-purple-100",
  ];

  const [randomColor] = useState(
    selectedNote?.bgColor ||
      noteColors[Math.floor(Math.random() * noteColors.length)],
  );

  const [input, setInput] = useState(selectedNote?.text || "");
  const [deletePopup, setDeletePopup] = useState(false);

  const handleNote = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const closeFunction = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (!input.trim()) return;

    if (selectedNote) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === selectedNote.id
            ? {
                ...note,
                text: input,
              }
            : note,
        ),
      );
    } else {
      const note = {
        id: Date.now(),
        text: input,
        bgColor: randomColor,
      };

      setNotes((prev) => [...prev, note]);
    }

    setOpen(false);
  };

  const handleDelete = () => {
    setDeletePopup(true);
  };

  const confirmDelete = () => {
    if (!selectedNote) return;

    setNotes((prev) => prev.filter((note) => note.id !== selectedNote.id));

    setDeletePopup(false);
    setOpen(false);
  };

  return (
    <div
      onClick={closeFunction}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
    >
      <div
        onClick={handleNote}
        className={`mx-4 flex h-[85vh] w-full max-w-lg flex-col rounded-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:h-[400px] md:p-6 ${randomColor}`}
      >
        <textarea
          placeholder="Write something here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-0 flex-1 resize-none bg-transparent p-2 text-lg outline-none md:text-xl"
        />

        <div className="mt-4 flex flex-wrap justify-end gap-2 md:mt-6">
          {selectedNote && (
            <button
              onClick={handleDelete}
              className="rounded-md bg-black px-4 py-2 text-sm text-white md:text-base"
            >
              Delete
            </button>
          )}

          <button
            onClick={handleSave}
            className="rounded-md bg-black px-4 py-2 text-sm text-white md:text-base"
          >
            {selectedNote ? "Update Note" : "Save Note"}
          </button>
        </div>

        {deletePopup && (
          <DeletePopup
            setDeletePopup={setDeletePopup}
            confirmDelete={confirmDelete}
          />
        )}
      </div>
    </div>
  );
};

export default NoteModal;
