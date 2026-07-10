import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { AnimeTrackerApp } from "./app/AnimeTrackerApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AnimeTrackerApp />
  </StrictMode>,
);
