import React, { useState } from "react";
import { Link } from "react-router-dom";

export type SideBarItemProps = {
  id: string | number;
  name: string;
  children: {
    title: string;
    url: string;
  }[];
};

export const SideBarItem = (sideBarItem: SideBarItemProps) => {
  const [hiddenState, setHiddenState] = useState<Boolean>(true);

  return (
    <div>
      <div
        className="flex justify-center align-middle text-lg text-slate-700 p-1 font-medium rounded-md hover:text-slate-900 hover:bg-slate-200 box-border min-w-fit  — {child}transition-all cursor-pointer"
        onClick={() => setHiddenState(hiddenState ? false : true)}
      >
        {sideBarItem.name}
      </div>
      {!hiddenState && (
        <div className="font-light mt-1 text-base p-1 rounded-sm transition-all hover:bg-green-500 hover:text-white cursor-pointer hover:font-medium">
          {sideBarItem.children.map((child, i) => (
            <Link to={child.url} key={i}>
              <div className="w-full h-full">— {child.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
