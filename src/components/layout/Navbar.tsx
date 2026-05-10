import { Search, ToggleLeft, ToggleRight, CircleUserRound } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 h-20 border-b bg-white">
      <div className="flex w-full max-w-xs gap-2 items-center border rounded-full bg-gray-50 pr-4 h-10">
        <input
          type="text"
          placeholder="Search for a task..."
          className="flex-1 p-2 pl-4 outline-none  text-sm "
        />
        <Search className="text-gray-500 shrink-0"/>
      </div>
      <div className="flex items-center gap-4">
        <ToggleLeft
          size={32}
          className="cursor-pointer text-gray-700 hover:text-black
transition-colors"
        />
        <CircleUserRound
          size={32}
          className="cursor-pointer text-gray-700 hover:text-black
transition-colors"
        />
      </div>
    </nav>
  );
};

export default Navbar;
