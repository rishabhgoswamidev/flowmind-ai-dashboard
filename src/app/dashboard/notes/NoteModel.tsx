// NoteModel.tsx

"use client";

import { useState } from "react";
import DeletePopup from "@/components/ui/DeletePopup";
import { useAppStore } from "@/store/useAppStore";
import type { ActivityType, NoteType } from "@/types/dataTypes";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNote: NoteType | null;
};

const NoteModal = ({ setOpen, selectedNote }: Props) => {
  const notes = useAppStore((state) => state.notes);
  const setNotes = useAppStore((state) => state.setNotes);
  const activities = useAppStore((state) => state.activities);
  const setActivities = useAppStore((state) => state.setActivities);

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
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id
          ? {
              ...note,
              text: input,
            }
          : note,
      );

      setNotes(updatedNotes);
    } else {
      const newNote = {
        id: Date.now(),
        text: input,
        bgColor: randomColor,
      };

      const activity: ActivityType = {
        id: Date.now(),
        action: `Created note "${input.slice(0, 30)}"`,
        type: "note",
        createdAt: new Date().toISOString(),
      };

      setActivities([activity, ...activities]);
      setNotes([...notes, newNote]);
    }

    setOpen(false);
  };

  const handleDelete = () => {
    setDeletePopup(true);
  };

  const confirmDelete = () => {
    if (!selectedNote) return;

    const updatedNotes = notes.filter((note) => note.id !== selectedNote.id);

    const activity:ActivityType = {
      id: Date.now(),
      action: `Deleted note "${selectedNote.text.slice(0, 30)}"`,
      type: "delete",
      createdAt: new Date().toISOString(),
    };

    setActivities([activity, ...activities]);

    setNotes(updatedNotes);

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
        className={`h-[400px] w-full max-w-lg rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] ${randomColor}`}
      >
        <textarea
          placeholder="Write something here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-full w-full resize-none bg-transparent p-2 text-xl outline-none"
        />

        <div className="mt-6 flex justify-end gap-2">
          {selectedNote && (
            <button
              onClick={handleDelete}
              className="cursor-pointer rounded-md bg-black px-4 py-2 text-white"
            >
              Delete
            </button>
          )}

          <button
            onClick={handleSave}
            className="cursor-pointer rounded-md bg-black px-4 py-2 text-white"
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
