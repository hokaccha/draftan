import { useState } from "react";
import dynamic from "next/dynamic";
import type { EditorConfiguration } from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/dialog/dialog.css";

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

const CodeMirror = dynamic(
  async () => {
    await Promise.all([
      // @ts-expect-error
      import("codemirror/mode/markdown/markdown"),
      // @ts-expect-error
      import("codemirror/mode/javascript/javascript"),
      // @ts-expect-error
      import("codemirror/mode/sql/sql"),
      // @ts-expect-error
      import("codemirror/mode/ruby/ruby"),
      // @ts-expect-error
      import("codemirror/keymap/vim"),
    ]);

    const codemirror = await import("react-codemirror2");
    return codemirror.UnControlled;
  },
  { ssr: false }
);

function getItem(key: string): string | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(key);
}

const IndexPage = () => {
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

export default IndexPage;
