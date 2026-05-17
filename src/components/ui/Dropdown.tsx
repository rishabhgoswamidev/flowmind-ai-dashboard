"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("This Week");

  const dropdownList = ["This Week", "This Month", "This Year"];

  const handleSelect = (item: string) => {
    setSelected(item);
    setOpen(false)
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white py-2 px-4 rounded-md cursor-pointer text-sm border hover:bg-gray-50 transition"
      >
        {selected}

        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute bg-white border rounded-md text-sm z-50 top-full xl:right-0 mt-2 w-40 overflow-hidden shadow-md">
          {dropdownList?.map((item) => (
            <button
              key={item}
              onClick={()=> handleSelect(item)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
