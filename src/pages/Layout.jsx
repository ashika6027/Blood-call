import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./Style.css";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
