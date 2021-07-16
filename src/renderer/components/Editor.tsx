import { FC, useState } from "react";
import type { EditorConfiguration } from "codemirror";
import { UnControlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/sql/sql";
import "codemirror/mode/ruby/ruby";
import "codemirror/keymap/vim";

type Mode = {
  name: string;
  value: string;
};

const modes: Mode[] = [
  { name: "Markdown", value: "markdown" },
  { name: "JavaScript", value: "javascript" },
  { name: "TypeScript", value: "text/typescript" },
  { name: "JSON", value: "application/json" },
  { name: "SQL", value: "sql" },
  { name: "Ruby", value: "ruby" },
];

function findMode(name: string | null): Mode {
  return modes.find((mode) => mode.name === name) || modes[0];
}

const keymaps = ["default", "vim"];

function findKeymap(keymap: string | null): string {
  if (keymap === null) return keymaps[0];
  return keymaps.includes(keymap) ? keymap : keymaps[0];
}

function getItem(key: string): string | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(key);
}

export const Editor: FC = () => {
  const [keymap, setKeymap] = useState(findKeymap(getItem("draftan:keymap")));
  const [mode, setMode] = useState<Mode>(findMode(getItem("draftan:mode")));
  const handleKeymapChange = (event: React.FormEvent) => {
    const { target } = event;
    if (!(target instanceof HTMLSelectElement)) return;
    const keymap =
      keymaps.find((keymap) => keymap === target.value) || keymaps[0];
    setKeymap(keymap);
    localStorage.setItem("draftan:keymap", keymap);
  };
  const handleModeChange = (event: React.FormEvent) => {
    const { target } = event;
    if (!(target instanceof HTMLSelectElement)) return;
    const mode = modes.find((mode) => mode.name === target.value) || modes[0];
    setMode(mode);
    localStorage.setItem("draftan:mode", mode.name);
  };
  const options: EditorConfiguration = {
    mode: mode.value,
    keyMap: keymap,
    theme: "draftan-dark",
    lineWrapping: true,
  };
  return (
    <div id="layout">
      <header id="header"></header>
      <div id="editor">
        <CodeMirror options={options}></CodeMirror>
        <div id="toolbar">
          <select
            onChange={handleKeymapChange}
            className="select"
            defaultValue={keymap}
          >
            {keymaps.map((keymap) => (
              <option key={keymap} value={keymap}>
                {keymap}
              </option>
            ))}
          </select>
          <select
            onChange={handleModeChange}
            className="select"
            defaultValue={mode.name}
          >
            {modes.map((mode) => (
              <option key={mode.name} value={mode.name}>
                {mode.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
