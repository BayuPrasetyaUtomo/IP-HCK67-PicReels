import { useState } from "react";
import Avatar from "./avatar";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Home", src: "home" },
    // { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    // { title: "Schedule ", src: "Calendar" },
    // { title: "Search", src: "Search" },
    // { title: "Analytics", src: "Chart" },
    // { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "settings" },
  ];

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-primary h-screen p-5 float-left pt-8 relative duration-300`}
    >
      <img
        src="./public/assets/arrow.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex flex-wrap gap-x-2 justify-center mt-12">
        <Avatar
          show={`rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer duration-500 ${
            open && "scale-100"
          }`}
        />
        <h1
          className={`text-white mt-5 origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Alice Daybreaker
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
              index === 0 && "bg-light-white"
            } `}
          >
            <img className="size-6" src={`./public/assets/${Menu.src}.png`} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
