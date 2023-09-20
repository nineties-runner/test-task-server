"use client";
import React from "react";
import { SideBarItem, SideBarItemProps } from "../SideBarItem/SideBarItem";

export type SideBarProps = {
  items: SideBarItemProps[];
  className?: string;
};

export const SideBar = ({ items, className = "" }: SideBarProps) => {
  return (
    <div
      className={
        `${className}` +
        "flex flex-col p-4 min-h-screen bg-slate-100 min-w-fit border-r-2 hover:bg-white"
      }
    >
      <div className="text-3xl font-extrabold text-slate-800 mb-4">
        SYSTEM
        <p className="text-xl font-medium opacity-60">
          Simple server monitoring system.
        </p>
      </div>
      {items.map((item) => (
        <SideBarItem
          key={item.id}
          id={item.id}
          name={item.name}
          children={item.children}
        />
      ))}
    </div>
  );
};
