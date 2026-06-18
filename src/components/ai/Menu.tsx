"use client";

import { Trash2 } from "lucide-react";

type Props = {
  onDelete: () => void;
};

const Menu = ({ onDelete }: Props) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 top-full z-50 mt-2"
    >
      <ul className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-md">
        <li>
          <button
            onClick={onDelete}
            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;