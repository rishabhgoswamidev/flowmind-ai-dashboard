"use client";

import { useState } from "react";
import DeletePopup from "@/components/ui/DeletePopup";

type NoteType = {
  id: number;
  text: string;
  bgColor: string;
};

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
        className={`h-[400px] w-full max-w-lg rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]  ${randomColor}`}
      >
        <textarea
          placeholder="Write something here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-full w-full resize-none bg-transparent p-2 text-xl outline-none"
        />

        <div className="mt-6 flex gap-2 justify-end">
          {selectedNote && (
            <button
              onClick={handleDelete}
              className="rounded-md bg-black px-4 py-2 text-white cursor-pointer"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            className="rounded-md bg-black px-4 py-2 text-white cursor-pointer"
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
