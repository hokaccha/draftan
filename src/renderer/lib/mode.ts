import { useState } from "react";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/sql/sql";
import "codemirror/mode/ruby/ruby";

export type Mode = {
  name: string;
  value: string;
};

export const modes: Mode[] = [
  { name: "Markdown", value: "markdown" },
  { name: "JavaScript", value: "javascript" },
  { name: "TypeScript", value: "text/typescript" },
  { name: "JSON", value: "application/json" },
  { name: "SQL", value: "sql" },
  { name: "Ruby", value: "ruby" },
];

const defaultMode = modes[0];

const STORAGE_KEY = "draftan:mode";

function findMode(name: string | null): Mode {
  return modes.find((mode) => mode.name === name) || defaultMode;
}

function fetchDefaultMode(): Mode {
  return findMode(localStorage.getItem(STORAGE_KEY));
}

export function useMode() {
  const [mode, setModeValue] = useState<Mode>(fetchDefaultMode);
  const setMode = (name: string) => {
    const mode = findMode(name);
    setModeValue(mode);
    localStorage.setItem("draftan:mode", mode.name);
  };

  return { mode, setMode };
}
