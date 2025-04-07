import React from "react";
import NavBar from "../components/navbar";

export default function Layout({ children }) {
  return (
    <div className="w-full h-full overflow-x-hidden relative">
        <div className="z-50 fixed top-0 w-full"><NavBar /></div>
        <main className="w-full h-full">{children}</main>
    </div>
  );
}   