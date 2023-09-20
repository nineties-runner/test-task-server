import React, { Dispatch } from "react";

type FiltersTabProps = {
  isOpen: boolean;
  tags: string;
  setTags: Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
};

export const FiltersTab = ({
  handleClick,
  isOpen,
  tags,
  setTags,
}: FiltersTabProps) => {
  return (
    <div
      className="flex flex-col text-lg text-slate-600 transition-all select-none p-4 border-2 active:bg-slate-300 active:text-slate-900 font-bold justify-center align-middle h-12 cursor-pointer relative ml-4 rounded-full"
      onClick={handleClick}
    >
      ⚙️ Filters
      {isOpen ? (
        <div className="absolute top-20 left-0">
          <div className="relative bg-red-500 gap-2 flex flex-col p-4 w-96 h-fit">
            <input
              type="button"
              value="X"
              onClick={handleClick}
              className="absolute right-0 top-0"
            />
            <input
              type="text"
              placeholder="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <input type="text" placeholder="type" />
          </div>
        </div>
      ) : null}
    </div>
  );
};
